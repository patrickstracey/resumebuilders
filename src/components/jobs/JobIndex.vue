<template>
  <div id="filter-btn-holder">
    <button
      v-for="type of jobTypes"
      v-bind:key="type.id"
      class="link filter-btn accent"
      @click="filterListingByType(type.id)"
      v-bind:class="{ active: typeFilter.includes(type.id) }"
    >
      {{ type.display }}
    </button>
    <button
      v-for="category of categories"
      v-bind:key="category.id"
      class="link filter-btn primary"
      @click="filterListingByIndustry(category.id)"
      v-bind:class="{ active: categoryFilter === category.id }"
    >
      {{ category.display }}
    </button>
    <button
      v-for="city of cities"
      v-bind:key="city.lat"
      class="link filter-btn city"
      @click="filterListingByLocationCoords(city)"
      v-bind:class="{ active: locationFilter === city }"
    >
      📍 {{ city.name }}
    </button>
  </div>
  <div id="opp-holder" class="flex-column">
    <h2
      id="no-results"
      v-if="(jobs == null || jobs.length < 1) && loading == false"
    >
      We currently don't have any opportunities to show for these preferences 😭
    </h2>
    <job-card
      v-else
      v-for="job of jobs"
      v-bind:key="job.id"
      v-bind:job="job"
    ></job-card>
    <load-spinner v-if="loading"></load-spinner>
  </div>
</template>

<script>
import JobCard from "./JobCard.vue";
import LoadSpinner from "../ui/LoadSpinner.vue";
import firebaseInit from "../../firebaseInit.js";
import firebase from "firebase/app";
import { CATEGORIES } from "../../enums/category.js";
import { JOB_TYPES } from "../../enums/jobTypes.js";
import { CITIES } from "../../enums/cities.js";

const jobsRef = firebaseInit.firestore().collection("opportunities");

export default {
  components: { JobCard, LoadSpinner },
  name: "JobIndex",
  data() {
    return {
      jobs: [],
      categories: CATEGORIES,
      jobTypes: JOB_TYPES,
      cities: CITIES,
      typeFilter: [],
      locationFilter: null,
      locationCoords: null,
      categoryFilter: null,
      loading: true,
      mostRecentQuery: null,
      lastResultDoc: null,
    };
  },
  methods: {
    async getInitListings() {
      this.mostRecentQuery = jobsRef.orderBy("updated", "desc");
      if (this.$store.getters.retrieveStoredResults(0).length > 0) {
        this.jobs = this.$store.getters.retrieveStoredResults(0);
      } else {
        const jawbs = await this.mostRecentQuery.limit(5).get();
        this.convertToDataArray(jawbs, false);
        this.lastResultDoc = jawbs.docs[jawbs.docs.length - 1];
      }

      this.loading = false;
    },
    async filterListingByIndustry(category) {
      this.categoryFilter != category
        ? (this.categoryFilter = category)
        : (this.categoryFilter = null);
      this.debounce();
    },
    async filterListingByType(type) {
      if (this.typeFilter.includes(type)) {
        const i = this.typeFilter.indexOf(type);
        this.typeFilter.splice(i, 1);
      } else {
        this.typeFilter.push(type);
      }
      this.debounce();
    },
    async filterListingByLocationCoords(city) {
      if (this.locationFilter != city) {
        this.locationFilter = city;
        this.locationCoords = new firebase.firestore.GeoPoint(
          city.lat,
          city.long
        );
      } else {
        this.locationFilter = null;
        this.locationCoords = null;
      }
      this.debounce();
    },
    debounce() {
      this.jobs = [];
      this.loading = true;
      const category = [this.categoryFilter];
      const types = JSON.stringify(this.typeFilter);
      const locations = JSON.stringify(this.locationFilter);
      setTimeout(() => {
        if (
          category[0] == this.categoryFilter &&
          types == JSON.stringify(this.typeFilter) &&
          locations == JSON.stringify(this.locationFilter)
        ) {
          this.makeRequest();
        } else {
          return;
        }
      }, 900);
    },
    async makeRequest(limit = 10) {
      const qid = this.queryID();
      const query = await this.buildQuery(limit);
      const stateResults = this.$store.getters.retrieveStoredResults(qid);
      if (stateResults != null) {
        this.jobs = stateResults;
        stateResults.length >= 5 && stateResults.length % 5 === 0
          ? (this.lastResultDoc = stateResults[stateResults.length - 1])
          : (this.lastResultDoc = null);
      } else {
        const industryList = await query.get();
        this.convertToDataArray(industryList, false);

        if (industryList.docs.length < limit) {
          this.lastResultDoc = null;
        } else {
          this.lastResultDoc = industryList.docs[industryList.docs.length - 1];
        }
      }
      this.mostRecentQuery = query;
      this.loading = false;
    },
    async getAdditionalResults(limit) {
      if (this.lastResultDoc != null && this.loading == false) {
        this.loading = true;
        const createdDataPoint = this.lastResultDoc.created
          ? this.lastResultDoc.created
          : this.lastResultDoc.data().created;
        const query = this.mostRecentQuery.startAfter(createdDataPoint);
        const nextList = await query.limit(limit).get();
        this.convertToDataArray(nextList, true);
        if (nextList.docs.length < limit) {
          this.lastResultDoc = null;
        } else {
          this.lastResultDoc = nextList.docs[nextList.docs.length - 1];
        }
        this.loading = false;
      } else {
        this.lastResultDoc = null;
        this.loading = false;
      }
    },
    convertToDataArray(dataArray, appendToExistingResults) {
      appendToExistingResults ? null : (this.jobs = []);
      const qid = this.queryID();
      dataArray.forEach((result) => {
        const jawb = {
          id: result.id,
          ...result.data(),
        };
        this.jobs.push(jawb);
        this.$store.commit({
          type: "addListingToState",
          filterId: qid,
          listing: jawb,
        });
      });
    },
    queryID() {
      const intern = this.typeFilter.includes(1) ? 1000 : 0;
      const remote = this.typeFilter.includes(2) ? 200 : 0;
      const temp = this.typeFilter.includes(3) ? 30 : 0;
      const partTime = this.typeFilter.includes(4) ? 4 : 0;
      const locations = this.locationFilter ? this.locationID() : 0;
      const qid =
        this.categoryFilter * 10000 +
        intern +
        remote +
        temp +
        partTime +
        locations;
      return qid;
    },
    locationID() {
      let number = 0;
      number += this.locationFilter.lat + this.locationFilter.long;
      number = parseFloat(number.toFixed(3));
      return number;
    },
    async buildQuery(limit) {
      let query = jobsRef;
      if (this.categoryFilter) {
        query = query.where("category", "==", this.categoryFilter);
      }
      if (this.locationCoords) {
        query = query.where("location_geo", "==", this.locationCoords);
      }
      if (this.typeFilter.length > 0) {
        query = query.where(
          "attributes",
          "array-contains-any",
          this.typeFilter
        );
      }

      return query.orderBy("updated", "desc").limit(limit);
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 12;
        if (bottomOfWindow) {
          this.getAdditionalResults(10);
        }
      };
    },
  },

  mounted() {
    this.getInitListings();
    this.scroll();
  },
};
</script>

<style scoped>
#opp-holder {
  justify-content: flex-start;
  width: 100%;
  max-width: 900px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}

#filter-btn-holder {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(227px, 1fr));
  margin-top: 12px;
}

#no-results {
  text-align: center;
}

.filter-btn {
  margin: 4px;
  background-color: white;
  border-width: 3px;
  justify-self: stretch;
}

.primary {
  color: var(--rb-main);
  border-color: var(--rb-main);
}

.primary:hover {
  background-color: var(--rb-main-light-active);
}

.primary.active {
  background-color: var(--rb-main-light-active);
}

.accent {
  color: var(--rb-accent-dark);
  border-color: var(--rb-accent-dark);
}

.accent:hover {
  background-color: var(--rb-accent-dark-active);
}

.accent.active {
  background-color: var(--rb-accent-dark-active);
}

.city {
  color: var(--rb-city);
  border-color: var(--rb-city);
}

.city:hover {
  background-color: var(--rb-city-bg);
}

.city.active {
  background-color: var(--rb-city-bg);
}
</style>

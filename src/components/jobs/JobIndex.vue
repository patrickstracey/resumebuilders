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
  </div>
  <div id="opp-holder" class="flex-column">
    <h2 id="no-results" v-if="jobs.length < 1 && loading == false">
      We currently don't have any opportunitries to show for these filters 😭
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
import { CATEGORIES } from "../../enums/category.js";
import { JOB_TYPES } from "../../enums/jobTypes.js";

const jobsRef = firebaseInit.firestore().collection("opportunities");

export default {
  components: { JobCard, LoadSpinner },
  name: "JobIndex",
  data() {
    return {
      jobs: [],
      categories: CATEGORIES,
      jobTypes: JOB_TYPES,
      typeFilter: [],
      categoryFilter: null,
      loading: true,
      mostRecentQuery: null,
      lastResultDoc: null,
      unfilteredResults: [],
    };
  },
  methods: {
    async getInitListings() {
      this.mostRecentQuery = jobsRef.orderBy("created", "desc");
      const jawbs = await this.mostRecentQuery.limit(2).get();
      this.convertToDataArray(jawbs, false);
      this.lastResultDoc = jawbs.docs[jawbs.docs.length - 1];
      this.loading = false;
    },
    async filterListingByIndustry(category) {
      this.categoryFilter != category
        ? (this.categoryFilter = category)
        : (this.categoryFilter = null);
      this.makeRequest();
    },
    async filterListingByType(type) {
      if (this.typeFilter.includes(type)) {
        const i = this.typeFilter.indexOf(type);
        this.typeFilter.splice(i, 1);
      } else {
        this.typeFilter.push(type);
      }
      this.makeRequest();
    },
    async makeRequest(limit = 10) {
      this.loading = true;
      if (this.categoryFilter == null && this.typeFilter.length == 0) {
        this.jobs = this.unfilteredResults;
        return;
      }
      const query = await this.buildQuery(limit);
      const industryList = await query.get();
      this.convertToDataArray(industryList, false);
      this.mostRecentQuery = query;
      if (industryList.docs.length < limit) {
        this.lastResultDoc = null;
      } else {
        this.lastResultDoc = industryList.docs[industryList.docs.length - 1];
      }
      this.loading = false;
    },
    async getAdditionalResults(limit) {
      if (this.lastResultDoc != null && this.loading == false) {
        this.loading = true;
        const query = this.mostRecentQuery.startAfter(
          this.lastResultDoc.data().created
        );
        const industryList = await query.limit(limit).get();
        this.convertToDataArray(industryList, true);
        this.mostRecentQuery = query; //need to add pagination logic here
        if (industryList.docs.length < limit) {
          this.lastResultDoc = null;
        } else {
          this.lastResultDoc = industryList.docs[industryList.docs.length - 1];
        }
        this.loading = false;
      } else {
        this.lastResultDoc = null;
        this.loading = false;
      }
    },
    async buildQuery(limit) {
      let query = jobsRef;
      if (this.categoryFilter) {
        query = query.where("category", "==", this.categoryFilter);
      }
      if (this.typeFilter.length > 0) {
        query = query.where(
          "attributes",
          "array-contains-any",
          this.typeFilter
        );
      }
      return query.orderBy("created", "desc").limit(limit);
    },
    convertToDataArray(dataArray, appendToExistingResults) {
      appendToExistingResults ? "" : (this.jobs = []);
      const unfilteredQuery =
        this.categoryFilter == null && this.typeFilter.length == 0;
      dataArray.forEach((result) => {
        const jawb = { id: result.id, ...result.data() };
        this.jobs.push(jawb);
        if (unfilteredQuery) {
          this.unfilteredResults.push(jawb);
        }
      });

      console.log(this.unfilteredResults);
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
</style>

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
    <load-spinner v-if="loading"></load-spinner>
    <h2 id="no-results" v-else-if="jobs.length < 1">
      We currently don't have any opportunitries to show for these filters 😭
    </h2>
    <job-card
      v-else
      v-for="job of jobs"
      v-bind:key="job.id"
      v-bind:job="job"
    ></job-card>
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
    };
  },
  methods: {
    async getListings() {
      const jawbs = await jobsRef
        .orderBy("created", "desc")
        .limit(6)
        .get();
      this.convertToDataArray(jawbs);
      this.loading = false;
    },
    async filterListingByIndustry(category) {
      this.categoryFilter != category
        ? (this.categoryFilter = category)
        : (this.categoryFilter = null);
      console.log(this.categoryFilter);
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
    async makeRequest() {
      this.loading = true;
      const query = await this.buildQuery();
      const industryList = await query.get();
      this.convertToDataArray(industryList);
      this.loading = false;
    },
    buildQuery() {
      let query = jobsRef;
      if (this.categoryFilter == null && this.typeFilter.length == 0) {
        return query.limit(6);
      }
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
      return query.orderBy("created", "desc").limit(24);
    },
    convertToDataArray(dataArray) {
      this.jobs = [];
      dataArray.forEach((result) => {
        const jawb = { id: result.id, ...result.data() };
        this.jobs.push(jawb);
      });
    },
  },
  mounted() {
    this.getListings();
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

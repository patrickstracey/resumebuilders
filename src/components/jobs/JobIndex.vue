<template>
  <div class="flex-row" id="filter-btn-holder">
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
    <job-card
      v-for="job of jobs"
      v-bind:key="job.id"
      v-bind:job="job"
    ></job-card>
  </div>
</template>

<script>
import JobCard from "./JobCard.vue";
import firebaseInit from "../../firebaseInit.js";
import { CATEGORIES } from "../../enums/category.js";
import { JOB_TYPES } from "../../enums/jobTypes.js";

const jobsRef = firebaseInit.firestore().collection("opportunities");
//firebaseInit.firestore.setLogLevel("debug");

export default {
  components: { JobCard },
  name: "JobIndex",
  data() {
    return {
      jobs: [],
      categories: CATEGORIES,
      jobTypes: JOB_TYPES,
      typeFilter: [],
      categoryFilter: null,
    };
  },
  methods: {
    async getListings() {
      const jawbs = await jobsRef.limit(5).get();
      this.convertToDataArray(jawbs);
    },
    async filterListingByIndustry(category) {
      this.categoryFilter = category;
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
      const query = await this.buildQuery();
      const industryList = await query.get();
      this.convertToDataArray(industryList);
    },
    buildQuery() {
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
      return query.limit(24);
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 24px;
}

.filter-btn {
  margin: 4px;
  background-color: white;
  border-width: 3px;
  flex-basis: 238px;
  flex-grow: 1;
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

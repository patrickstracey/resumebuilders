<template>
  <div id="opp-holder" class="flex-column">
    <div class="flex-row" id="filter-btn-holder">
      <button
        v-for="category of categories"
        v-bind:key="category.id"
        class="link filter-btn"
        @click="filterListing(category.id)"
      >
        {{ categoriesByInt[category.id] }}
      </button>
    </div>

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
import { CATEGORIES, CATEGORIES_BY_INT } from "../../enums/category.js";

const jobsRef = firebaseInit.firestore().collection("opportunities");

export default {
  components: { JobCard },
  name: "JobIndex",
  data() {
    return {
      jobs: [],
      categories: CATEGORIES,
      categoriesByInt: CATEGORIES_BY_INT,
    };
  },
  methods: {
    async getListings() {
      const jawbs = await jobsRef.limit(5).get();
      jawbs.forEach((result) => {
        const jawb = { id: result.id, ...result.data() };
        this.jobs.push(jawb);
      });
    },
    filterListing(category) {
      console.log(
        `filtering for ${this.categoriesByInt[category]} -- ${category}`
      );
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
}

.filter-btn {
  margin: 4px;
  background-color: white;
  color: var(--rb-main);
  border-width: 3px;
  flex-basis: 238px;
  flex-grow: 1;
}

.filter-btn:hover {
  background-color: var(--rb-main-light-active);
}
</style>

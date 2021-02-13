<template>
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
const jobsRef = firebaseInit.firestore().collection("opportunities");

export default {
  components: { JobCard },
  name: "JobIndex",
  data() {
    return {
      jobs: [],
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
</style>

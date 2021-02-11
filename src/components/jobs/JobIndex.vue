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
import { JAWBS } from "../../_mock/jobs.js";
export default {
  components: { JobCard },
  name: "JobIndex",
  props: {
    msg: String,
  },
  data() {
    return {
      jobs: JAWBS,
    };
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

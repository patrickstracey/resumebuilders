<template>
  <h1>Hello there</h1>
  <div class="opportunity-card">
    <div class="info group">
      <h2>{{ job.title }}</h2>
      <p>{{ job.company }}</p>
    </div>
    <div class="detail-link group">
      <a href>View Opportunity</a>
    </div>
  </div>
</template>

<script>
import { JAWBS } from "../../_mock/jobs.js";
export default {
  props: ["oppId"],
  data() {
    return {
      jobs: JAWBS,
    };
  },
  created() {
    this.loadOpportunity(this.oppId);
  },
  methods: {
    loadOpportunity(oppUuid) {
      this.job = this.jobs.find((opp) => opp.id == oppUuid);
    },
  },
  watch: {
    oppId(newId) {
      this.loadOpportunity(newId);
    },
  },
};
</script>

<style scoped>
.opportunity-card {
  padding: 15px;
  border: solid 2px green;
  border-radius: 16px;
  margin: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.group {
  margin-top: auto;
  margin-bottom: auto;
}
</style>

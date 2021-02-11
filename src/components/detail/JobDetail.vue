<template>
  <div class="detail-page flex-column">
    <div class="headline group">
      <h2>{{ job.title }}</h2>
      <p>{{ job.company }}</p>
      <div class="flex-row attributes">
        <p
          v-for="attribute of job.attributes"
          v-bind:key="attribute"
          class="attribute"
        >
          {{ attribute }}
        </p>
      </div>
    </div>
    <div class="details">
      {{ job.description }}
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
.detail-page {
  margin: 90px auto auto auto;
  width: 90%;
  max-width: 900px;
}

.details {
  white-space: pre-line;
}

.attributes {
  justify-content: flex-start;
}

.attribute {
  margin-right: 12px;
  border: 2px solid green;
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  background-color: whitesmoke;
}
</style>

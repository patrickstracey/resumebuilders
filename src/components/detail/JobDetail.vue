<template>
  <div class="detail-page flex-column" v-if="job">
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
          <span v-if="attribute === 'Remote Friendly'">🌎</span>
          <span v-else-if="attribute === 'Internship'">🎓</span>
          <span v-else-if="attribute === 'Temp'">⌚</span>
        </p>
      </div>
    </div>
    <div class="details">
      <p>{{ job.description }}</p>
    </div>

    <a
      v-bind:href="job.url"
      v-if="job.url"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
      id="apply-btn"
      >Apply</a
    >
  </div>
  <div class="detail-page" v-else>
    <h2>Uh oh... The opportunity you're looking for doesn't exist 😲</h2>
    <p>Maybe it was an illusion or something?</p>
    <router-link to="/" class="link">Back Home</router-link>
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
  background-color: white;
  min-height: 70vh;
  box-shadow: 0 2px 8px rgba(42, 77, 44, 0.26);
  padding: 16px;
  border-radius: 16px;
  justify-content: flex-start;
}

.details {
  white-space: pre-line;
  margin-top: 24px;
}

.attributes {
  margin-top: 8px;
  justify-content: flex-start;
}

.attribute {
  margin: 0px 12px 0px 0px;
  border: 1px solid green;
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  background-color: rgba(0, 128, 0, 0.11);
  color: green;
  font-size: 14px;
}

#apply-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
  cursor: pointer;
  align-self: center;
  font-weight: 300;
}
</style>

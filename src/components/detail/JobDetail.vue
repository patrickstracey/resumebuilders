<template>
  <div class="detail-page flex-column" v-if="job">
    <div class="headline group">
      <h2>{{ job.title }}</h2>
      <p>{{ job.company }}</p>
      <shield-detail v-bind:job="job"></shield-detail>
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
import ShieldDetail from "../shields/ShieldDetail.vue";
import firebaseInit from "../../firebaseInit.js";
const jobsRef = firebaseInit.firestore().collection("opportunities");
export default {
  components: { ShieldDetail },
  props: ["oppId"],
  data() {
    return {
      job: {},
    };
  },
  mounted() {
    this.loadOpportunity(this.oppId);
  },
  methods: {
    async loadOpportunity(oppUuid) {
      const jobFetch = await jobsRef.doc(oppUuid).get();
      this.job = jobFetch.data();
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

#apply-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
  cursor: pointer;
  align-self: center;
}
</style>

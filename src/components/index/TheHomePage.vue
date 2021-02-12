<template>
  <div class="flex-column" id="home-page">
    <span id="welcome-msg"
      >Explore entry level and internship opportunities that will level up your
      experience.</span
    >
    <job-index></job-index>
  </div>
</template>

<script>
import JobIndex from "../jobs/JobIndex.vue";
export default {
  components: { JobIndex },
  name: "TheHomePage",
};
</script>

<style scoped>
#home-page {
  margin-top: 90px;
  justify-content: flex-start;
  width: 90%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

#welcome-msg {
  text-align: center;
  font-size: 28px;
}
</style>

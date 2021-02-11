<template>
  <the-header></the-header>
  <job-index></job-index>
</template>

<script>
import TheHeader from "./components/global/TheHeader.vue";
import JobIndex from "./components/index/JobIndex.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    JobIndex,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

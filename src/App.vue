<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/global/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

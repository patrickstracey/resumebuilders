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
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
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

.link {
  padding: 2px 8px 2px 8px;
  border: 1px solid green;
  background-color: green;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 18px;
}

.link:hover {
  border-color: rgb(0, 97, 0);
  background-color: rgb(0, 97, 0);
}

.link:active {
  border-color: rgb(4, 53, 4);
  background-color: rgb(4, 53, 4);
}
</style>

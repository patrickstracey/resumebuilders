<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
  <the-circles></the-circles>
</template>

<script>
import TheHeader from "./components/global/TheHeader.vue";
import TheFooter from "./components/global/TheFooter.vue";
import TheCircles from "./components/index/TheCircles.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    TheCircles,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

#app {
  font-family: "Cabin", sans-serif;
  font-weight: normal;
}

h1,
h2,
h3 {
  font-weight: 300;
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
  padding: 4px 12px 4px 12px;
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

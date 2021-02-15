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

:root {
  --rb-main: #008000;
  --rb-main-hover: #056905;
  --rb-main-light: #eeffee;
  --rb-main-light-active: #b5e9b5;
  --rb-main-dark: #075307;
  --rb-accent: #ffa500;
  --rb-accent-light: #fff7e3;
  --rb-accent-dark: #ff4500;
  --rb-third: #575555;
  --rb-third-light: #f5f5f5;
}

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
  border: 1px solid var(--rb-main);
  background-color: var(--rb-main);
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
}

.link:hover {
  border-color: var(--rb-main-hover);
  background-color: var(--rb-main-hover);
}

.link:active {
  border-color: var(--rb-main-dark);
  background-color: var(--rb-main-dark);
}
</style>

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
import firebaseInit from "./firebaseInit.js";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    TheCircles,
  },
  methods: {
    subscribeToAuth() {
      firebaseInit.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit({
            type: "setCurrentUser",
            user: user,
          });
        } else {
          this.$store.commit({
            type: "logoutUser",
          });
        }
      });
    },
  },
  created() {
    this.subscribeToAuth();
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
  --rb-accent-light: #fff7e3;
  --rb-accent-dark: #ff4500;
  --rb-accent-dark-active: #ffeaab;
  --rb-third-light: #f5f5f5;
  --rb-city: #1456ac;
  --rb-city-bg: #d7e6f8;
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
  padding: 4px;
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

.secondary-link {
  padding: 4px;
  color: var(--rb-main);
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  background-color: unset;
  border-style: none;
}

.secondary-link:active {
  background-color: var(--rb-main-light-active);
}
</style>

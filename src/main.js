import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

import App from "./App.vue";
import TheHomePage from "./components/index/TheHomePage.vue";

const NewOppForm = () => import("./components/create/NewOppForm.vue");
const JobDetail = () => import("./components/detail/JobDetail.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: TheHomePage },
    { path: "/new-opportunity", component: NewOppForm },
    { path: "/opportunity/:oppId", component: JobDetail, props: true },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

const store = createStore({
  state() {
    return {
      previousResults: {
        0: [],
      },
    };
  },
  mutations: {
    addListingToState(state, payload) {
      const filterGroup = state.previousResults[payload.filterId];
      if (filterGroup) {
        if (filterGroup.includes(payload.listing)) {
          return;
        } else {
          state.previousResults[payload.filterId].push(payload.listing);
        }
      } else {
        if (payload.listing) {
          state.previousResults[payload.filterId] = [payload.listing];
        } else {
          state.previousResults[payload.filterId] = [];
        }
      }
    },
  },
  getters: {
    retrieveStoredResults: (state) => (filterID) => {
      if (state.previousResults[filterID]) {
        return state.previousResults[filterID];
      } else {
        return null;
      }
    },
  },
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

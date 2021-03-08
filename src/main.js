import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

import App from "./App.vue";
import TheHomePage from "./components/index/TheHomePage.vue";

const NewOppForm = () => import("./components/create/NewOppForm.vue");
const JobDetail = () => import("./components/detail/JobDetail.vue");
const AccountLogin = () => import("./components/account/AccountLogin.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: TheHomePage },
    {
      path: "/new-opportunity",
      component: NewOppForm,
      meta: { requiresAuth: true },
    },
    { path: "/opportunity/:oppId", component: JobDetail, props: true },
    { path: "/login", component: AccountLogin },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

const store = createStore({
  state() {
    return {
      previousResults: {
        0: [],
      },
      currentUser: null,
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
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    logoutUser(state) {
      state.currentUser = null;
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
    retrieveCurrentUser: (state) => () => {
      if (state.currentUser) {
        return state.currentUser;
      } else {
        return null;
      }
    },
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && store.getters.retrieveCurrentUser() == null) {
    next("/login");
  } else {
    next();
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

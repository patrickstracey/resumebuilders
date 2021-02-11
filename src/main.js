import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import JobIndex from "./components/index/JobIndex.vue";
import JobDetail from "./components/detail/JobDetail.vue";
import NewOppForm from "./components/create/NewOppForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: JobIndex },
    { path: "/newjob", component: NewOppForm },
    { path: "/opportunity/:oppId", component: JobDetail, props: true },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

createApp(App)
  .use(router)
  .mount("#app");

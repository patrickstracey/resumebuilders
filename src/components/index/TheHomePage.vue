<template>
  <div class="flex-column" id="home-page">
    <h1 id="welcome-msg">
      Explore entry level and internship opportunities
      <select id="location-geo" name="location-geo" v-model="oppLocationGeo">
        <option v-bind:value="null"> </option>
        <option
          v-for="city of cities"
          v-bind:key="city.name"
          v-bind:value="city"
          >in {{ city.name }}</option
        >
      </select>

      that will level up your experience.
    </h1>
    <job-index></job-index>
  </div>
</template>

<script>
import JobIndex from "../jobs/JobIndex.vue";
import { CITIES } from "../../enums/cities.js";
export default {
  components: { JobIndex },
  name: "TheHomePage",
  data() {
    return {
      cities: CITIES,
    };
  },
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

select {
  appearance: none;
  background-color: transparent;
  border: 3px solid var(--rb-main);
  border-radius: 4px;
  padding: 0 0 0 4px;
  margin: 6px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  height: 45px;
}

option {
  padding: 4px;
}

option:focus {
  background-color: var(--rb-main);
}
</style>

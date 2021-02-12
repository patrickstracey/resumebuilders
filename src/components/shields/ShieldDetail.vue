<template>
  <div class="flex-row attributes" v-if="job">
    <span v-if="job.category" class="category-shield">{{
      getCategory(job.category)
    }}</span>
    <p
      v-for="attribute of job.attributes"
      v-bind:key="attribute"
      class="attribute"
    >
      {{ attribute }}
      <span v-if="attribute === 'Remote Friendly'">🌎</span>
      <span v-else-if="attribute === 'Internship'">🎓</span>
      <span v-else-if="attribute === 'Temp'">⌚</span>
    </p>
  </div>
</template>

<script>
import { CATEGORIES_BY_INT } from "../../enums/category.js";
export default {
  name: "ShieldDetail",
  props: {
    job: Object,
  },
  methods: {
    getCategory(cat_id) {
      return CATEGORIES_BY_INT[cat_id];
    },
  },
};
</script>

<style scoped>
.attributes {
  margin-top: 8px;
  justify-content: flex-start;
}

.attribute {
  margin: 0px 12px 0px 0px;
  border: 1px solid var(--rb-main);
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  background-color: var(--rb-main-light);
  color: var(--rb-main);
  font-size: 14px;
}

.category-shield {
  margin: 0px 12px 0px 0px;
  border: 1px solid var(--rb-accent-dark);
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  background-color: var(--rb-accent-light);
  color: var(--rb-accent-dark);
  font-size: 14px;
}

@media screen and (max-width: 600px) {
  .attributes {
    flex-wrap: wrap;
  }

  .attribute,
  .category-shield {
    margin-bottom: 4px;
  }
}
</style>

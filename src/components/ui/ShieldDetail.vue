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
      {{ getType(attribute) }}
    </p>
  </div>
</template>

<script>
import { CATEGORIES_BY_INT } from "../../enums/category.js";
import { JOB_TYPE_BY_INT } from "../../enums/jobTypes.js";
export default {
  name: "ShieldDetail",
  props: {
    job: Object,
  },
  methods: {
    getCategory(cat_id) {
      return CATEGORIES_BY_INT[cat_id];
    },
    getType(type_id) {
      return JOB_TYPE_BY_INT[type_id];
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
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  font-size: 14px;
  background-color: var(--rb-accent-light);
  color: var(--rb-accent-dark);
  border: 1px solid var(--rb-accent-dark);
}

.category-shield {
  margin: 0px 12px 0px 0px;
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  font-size: 14px;
  border: 1px solid var(--rb-main);
  background-color: var(--rb-main-light);
  color: var(--rb-main);
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

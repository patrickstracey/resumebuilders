<template>
  <div class="opportunity-card">
    <div
      @click="expand()"
      class="info group header"
      v-bind:class="{ expanded: expanded }"
    >
      <div class="flex-row">
        <div>
          <h2>{{ job.title }}</h2>
          <span>{{ job.company }}</span>
        </div>
        <div class="group flex-column">
          <a
            v-bind:href="job.url"
            v-if="job.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >Apply</a
          >
        </div>
      </div>
      <shield-detail v-bind:job="job"></shield-detail>
    </div>

    <div class="flex-column" v-if="expanded">
      <div class="details">
        <p>{{ job.description }}</p>
      </div>
      <router-link
        v-bind:to="'/opportunity/' + job.id"
        class="tab"
        target="_blank"
        rel="noopener noreferrer"
        >Open in New Tab ➧
      </router-link>
    </div>
  </div>
</template>

<script>
import ShieldDetail from "../shields/ShieldDetail.vue";
export default {
  components: { ShieldDetail },
  name: "JobCard",
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    },
  },
  props: {
    job: Object,
  },
};
</script>

<style scoped>
h2,
span {
  margin: unset;
}

.opportunity-card {
  margin: 8px;
  box-shadow: 0 2px 8px rgba(42, 77, 44, 0.26);
  border-radius: 16px;
  background-color: white;
}

.header:hover {
  background-color: rgba(0, 128, 0, 0.082);
}

.header:active {
  background-color: rgba(7, 94, 7, 0.363);
}

.header {
  padding: 15px;
  border-radius: 16px;
  cursor: pointer;
}

.group {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
}

.details {
  white-space: pre-line;
  padding: 12px;
  border-top: unset;
  border-radius: 0px 0px 16px 16px;
}

.expanded {
  border-radius: 16px 16px 0px 0px;
  border-bottom: unset;
  background-color: rgba(245, 245, 245, 0.911);
}

.tab {
  align-self: flex-end;
  text-decoration: none;
  color: rgb(87, 87, 87);
  margin: 24px 12px 24px 0px;
  padding: 4px 4px;
  border: 1px solid rgb(87, 87, 87);
  border-radius: 6px;
}

.tab:hover {
  background-color: whitesmoke;
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

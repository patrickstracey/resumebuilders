<template>
  <div class="opportunity-card">
    <div
      @click="expand()"
      class="info group header"
      v-bind:class="{ expanded: expanded }"
    >
      <div class="flex-row">
        <div id="header-details">
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
      <div id="opp-description">
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
import ShieldDetail from "../ui/ShieldDetail.vue";
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
  background-color: #ffffff;
}

.header:hover {
  background-color: var(--rb-main-light);
}

.header:active {
  background-color: var(--rb-main-light-active);
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

.expanded {
  border-radius: 16px 16px 0px 0px;
  border-bottom: unset;
  background-color: #f5f5f5e8;
}

.tab {
  align-self: flex-end;
  text-decoration: none;
  color: var(--rb-third);
  margin: 24px 12px 24px 0px;
  padding: 4px 4px;
  border: 1px solid var(--rb-third);
  border-radius: 6px;
}

.tab:hover {
  border-color: var(--rb-main);
  color: var(--rb-main);
  background-color: var(--rb-third-light);
}

#header-details {
  text-transform: capitalize;
}

#opp-description {
  white-space: pre-line;
  padding: 12px;
  border-top: unset;
  border-radius: 0px 0px 16px 16px;
}
</style>

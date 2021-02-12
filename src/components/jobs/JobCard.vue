<template>
  <div class="opportunity-card" @click="expand()">
    <div class="info group header" v-bind:class="{ expanded: expanded }">
      <div class="flex-row">
        <div>
          <h2>{{ job.title }}</h2>
          <span>{{ job.company }}</span>
          <div class="flex-row attributes">
            <p
              v-for="attribute of job.attributes"
              v-bind:key="attribute"
              class="attribute"
            >
              {{ attribute }}
              <span v-if="attribute === 'Remote Friendly'">🌎</span>
              <span v-else-if="attribute === 'Internship'">🎓</span>
              <span v-else-if="attribute === 'Temp Work'">⌚</span>
            </p>
          </div>
        </div>
        <div class="detail-link group">
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
    </div>

    <div class="details" v-if="expanded">
      {{ job.description }}
    </div>
  </div>
</template>

<script>
export default {
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

.attributes {
  margin-top: 8px;
  justify-content: flex-start;
}

.attribute {
  margin: 0px 12px 0px 0px;
  border: 1px solid green;
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  background-color: rgba(0, 128, 0, 0.11);
  color: green;
  font-size: 14px;
}

.details {
  white-space: pre-line;
  padding: 16px 12px 16px 12px;
  border-top: unset;
  border-radius: 0px 0px 16px 16px;
}

.expanded {
  border-radius: 16px 16px 0px 0px;
  border-bottom: unset;
  background-color: rgba(245, 245, 245, 0.911);
}
</style>

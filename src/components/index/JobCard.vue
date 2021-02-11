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
  margin: 15px;
}

.header:hover {
  background-color: whitesmoke;
}

.header:active {
  background-color: gray;
}

.header {
  padding: 15px;
  border: solid 2px green;
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
  background-color: green;
  color: white;
  font-size: 14px;
}

.details {
  white-space: pre-line;
  padding: 16px 12px 16px 12px;
  border: solid 2px gray;
  border-top: unset;
  border-radius: 0px 0px 16px 16px;
}

.expanded {
  border-radius: 16px 16px 0px 0px;
  border-bottom: unset;
  background-color: rgba(0, 128, 0, 0.219);
}
</style>

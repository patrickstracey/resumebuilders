<template>
  <form @submit.prevent="submitForm()" class="flex-column">
    <div class="form-control">
      <label for="opp-title">Job Title</label>
      <input
        id="opp-title"
        name="opp-title"
        type="text"
        v-model.trim="oppTitle"
      />
    </div>
    <div class="form-control">
      <label for="opp-company">Company Name</label>
      <input
        id="opp-company"
        name="opp-company"
        type="text"
        v-model.trim="oppCompany"
      />
    </div>
    <div class="form-control">
      <label for="opp-description">Job Description</label>
      <textarea
        id="opp-description"
        name="opp-description"
        rows="8"
        v-model="oppDescription"
      ></textarea>
    </div>

    <div class="form-control">
      <label for="opp-cat">Department</label>
      <select id="opp-cat" name="opp-cat" v-model="oppCategory">
        <option v-bind:value="categoryTypes.ACCOUNT_MANAGEMENT"
          >Account Management</option
        >
        <option v-bind:value="categoryTypes.DESIGN">Design</option>
        <option v-bind:value="categoryTypes.MANUFACTURING"
          >Manufacturing</option
        >
        <option v-bind:value="categoryTypes.MARKETING">Marketing</option>
        <option v-bind:value="categoryTypes.PRODUCT">Product</option>
        <option v-bind:value="categoryTypes.SALES">Sales</option>
        <option v-bind:value="categoryTypes.SOFTWARE">Software</option>
        <option v-bind:value="categoryTypes.SUPPLY_CHAIN">Supply Chain</option>
        <option v-bind:value="categoryTypes.WAREHOUSE">Warehouse</option>
      </select>
    </div>
    <div class="form-control">
      <h2>Relevant Tags</h2>
      <div>
        <input
          id="att-remote"
          name="opp-attribute"
          type="checkbox"
          value="remote"
          v-model="oppAttributes"
        />
        <label for="att-remote">Remote Friendly</label>
      </div>
      <div>
        <input
          id="att-temp"
          name="opp-attribute"
          type="checkbox"
          value="temp"
          v-model="oppAttributes"
        />
        <label for="att-temp">Temp Work</label>
      </div>
      <div>
        <input
          id="att-internship"
          name="opp-attribute"
          type="checkbox"
          value="internship"
          v-model="oppAttributes"
        />
        <label for="att-internship">Internship</label>
      </div>
    </div>
    <div>
      <button class="link" id="submit-btn">Post Job!</button>
    </div>
  </form>
</template>

<script>
import { JAWBS } from "../../_mock/jobs.js";
import { CATEGORIES } from "../../enums/category.js";
export default {
  data() {
    return {
      oppTitle: "",
      oppCompany: "",
      oppDescription: "",
      oppCategory: null,
      oppAttributes: [],
      categoryTypes: CATEGORIES,
      jobs: JAWBS,
    };
  },
  methods: {
    submitForm() {
      const newJob = {
        id: Math.floor(Math.random() * 100) + 100,
        title: this.oppTitle,
        company: this.oppCompany,
        description: this.oppDescription,
        attributes: this.oppAttributes,
        category: this.oppCategory,
        created: new Date(),
      };
      JAWBS.unshift(newJob);
    },
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  margin-top: 80px;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
  border: 3px solid green;
  border-radius: 4px;
}

textarea {
  padding-left: 4px;
  max-width: 100%;
}

input[type="checkbox"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="text"] {
  height: 32px;
  padding-left: 4px;
}

input[type="checkbox"] + label {
  font-weight: normal;
}

select {
  appearance: none;
  background-color: transparent;
  border: 3px solid green;
  border-radius: 4px;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  height: 32px;
}

option:focus {
  background-color: green;
}

#submit-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
  cursor: pointer;
}
</style>

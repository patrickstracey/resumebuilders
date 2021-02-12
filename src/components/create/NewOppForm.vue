<template>
  <div class="success card" v-if="submitted">
    <h2>🎉 Your Opportunity Has Been Successfully Submitted! 🎉</h2>
    <div class="flex-row" id="success-actions">
      <button @click="createNewOpp()" class="link">Create Another</button>
      <router-link to="/" class="link inverse">Back Home</router-link>
    </div>
  </div>
  <form @submit.prevent="submitForm()" class="flex-column card" v-else>
    <div class="form-control">
      <label for="opp-title">Job Title*</label>
      <input
        id="opp-title"
        name="opp-title"
        type="text"
        v-model.trim="oppTitle"
      />
    </div>
    <div class="form-control">
      <label for="opp-company">Company Name*</label>
      <input
        id="opp-company"
        name="opp-company"
        type="text"
        v-model.trim="oppCompany"
      />
    </div>
    <div class="form-control">
      <label for="opp-url">Where to Apply URL*</label>
      <input id="opp-url" name="opp-url" type="url" v-model.trim="oppUrl" />
    </div>
    <div class="form-control">
      <label for="opp-description">Job Description*</label>
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
        <option
          v-for="category of categoryTypes"
          v-bind:key="category.id"
          v-bind:value="category.id"
          >{{ category.display }}</option
        >
      </select>
    </div>
    <div class="form-control">
      <h2>Relevant Tags</h2>
      <div>
        <input
          id="att-remote"
          name="opp-attribute"
          type="checkbox"
          value="Remote Friendly"
          v-model="oppAttributes"
        />
        <label for="att-remote">Remote Friendly</label>
      </div>
      <div>
        <input
          id="att-internship"
          name="opp-attribute"
          type="checkbox"
          value="Internship"
          v-model="oppAttributes"
        />
        <label for="att-internship">Internship</label>
      </div>
      <div>
        <input
          id="att-temp"
          name="opp-attribute"
          type="checkbox"
          value="Temp"
          v-model="oppAttributes"
        />
        <label for="att-temp">Temp</label>
      </div>
    </div>
    <div>
      <div v-if="errors.length > 0" class="errors">
        <h2>We need a little bit more info from you... 😬</h2>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
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
      oppTitle: null,
      oppCompany: null,
      oppDescription: null,
      oppCategory: null,
      oppAttributes: [],
      categoryTypes: CATEGORIES,
      oppUrl: null,
      jobs: JAWBS,
      errors: [],
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      if (this.checkFormValidity()) {
        const newJob = {
          id: Math.floor(Math.random() * 100) + 100,
          title: this.oppTitle.trim(),
          company: this.oppCompany.trim(),
          description: this.oppDescription.trim(),
          attributes: this.oppAttributes,
          category: this.oppCategory,
          created: new Date(),
          url: this.oppUrl.trim(),
        };
        JAWBS.unshift(newJob);
        this.resetForm();
        this.submitted = true;
      }
    },
    checkFormValidity() {
      this.errors = [];
      if (
        this.oppTitle &&
        this.oppCompany &&
        this.oppDescription &&
        this.oppUrl
      ) {
        return true;
      } else {
        if (!this.oppTitle) {
          this.errors.push(
            "Missing Job Title - what is the name of the role? 💼"
          );
        }
        if (!this.oppCompany) {
          this.errors.push("Missing Company - who are you? 🏦");
        }
        if (!this.oppDescription) {
          this.errors.push(
            "Missing Job Description - what will this role be doing day-to-day? 📜"
          );
        }
        if (!this.oppUrl) {
          this.errors.push(
            "Missing URL - we need a link to the page where people can apply 🔗"
          );
        }
        return false;
      }
    },
    resetForm() {
      this.oppTitle = null;
      this.oppCompany = null;
      this.oppDescription = null;
      this.oppAttributes = [];
      this.oppUrl = null;
    },
    createNewOpp() {
      this.submitted = false;
    },
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
  border: 3px solid var(--rb-main);
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

input[type="text"],
input[type="url"] {
  height: 32px;
  padding-left: 4px;
}

select {
  appearance: none;
  background-color: transparent;
  border: 3px solid var(--rb-main);
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
  background-color: var(--rb-main);
}

.card {
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

.errors {
  border: 3px solid rgb(128, 0, 0);
  background-color: rgba(255, 58, 58, 0.116);
  border-radius: 4px;
  padding: 8px 16px;
}

.success {
  text-align: center;
}

.success > h2 {
  color: var(--rb-main);
}

.inverse {
  background-color: white;
  color: var(--rb-main);
}

.inverse:hover {
  background-color: whitesmoke;
}

#submit-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
  cursor: pointer;
}

#success-actions {
  justify-content: space-evenly;
}
</style>

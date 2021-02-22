<template>
  <div class="success card" v-if="submitted">
    <h2>🎉 Your Opportunity Has Been Successfully Submitted! 🎉</h2>
    <div class="flex-row" id="success-actions">
      <button @click="createNewOpp()" class="link">Create Another</button>
      <router-link to="/" class="link inverse">Back Home</router-link>
    </div>
  </div>
  <div class="flex-column card" v-else-if="processing">
    <load-spinner></load-spinner>
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
      <small
        >Applicants cannot apply via our site directly, so we need a URL to
        direct them to where they can submit their applications.</small
      >
    </div>
    <div class="form-control">
      <label for="opp-location">Location</label>
      <input
        id="opp-location"
        name="opp-location"
        type="text"
        v-model.trim="oppLocation"
      />
    </div>
    <div class="form-control">
      <label for="opp-description">Job Description*</label>
      <textarea
        id="opp-description"
        name="opp-description"
        rows="14"
        v-model="oppDescription"
      ></textarea>
    </div>

    <div class="form-control">
      <label for="opp-cat">Department</label>
      <select id="opp-cat" name="opp-cat" v-model="oppCategory">
        <option v-bind:value="null"> </option>
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
      <div v-for="type of jobTypes" v-bind:key="type.id">
        <input
          id="att-internship"
          name="opp-attribute"
          type="checkbox"
          v-bind:value="type.id"
          v-model="oppAttributes"
        />
        <label for="att-internship">{{ type.display }}</label>
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
import LoadSpinner from "../ui/LoadSpinner.vue";
import { CATEGORIES } from "../../enums/category.js";
import { JOB_TYPES } from "../../enums/jobTypes.js";
import firebaseInit from "../../firebaseInit.js";
const jobsRef = firebaseInit.firestore().collection("opportunities");

export default {
  components: { LoadSpinner },
  data() {
    return {
      oppTitle: null,
      oppCompany: null,
      oppDescription: null,
      oppCategory: null,
      oppAttributes: [],
      oppLocation: null,
      categoryTypes: CATEGORIES,
      jobTypes: JOB_TYPES,
      oppUrl: null,
      errors: [],
      submitted: false,
      processing: false,
    };
  },
  methods: {
    submitForm() {
      const initDate = new Date();
      if (this.checkFormValidity()) {
        this.processing = true;
        const newJob = {
          title: this.oppTitle.trim(),
          company: this.oppCompany.trim(),
          description: this.oppDescription.trim(),
          attributes: this.oppAttributes,
          category: this.oppCategory,
          location: this.oppLocation,
          created: initDate,
          updated: initDate,
          url: this.oppUrl.trim() + "?utm_source=resume_builders",
        };
        jobsRef.add(newJob).then(() => {
          this.resetForm();
          this.submitted = true;
          this.processing = false;
        });
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
      this.oppCategory = null;
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
  cursor: pointer;
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
  cursor: pointer;
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
}

#success-actions {
  justify-content: space-evenly;
}
</style>

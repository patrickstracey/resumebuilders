<template>
  <form @submit.prevent="submitForm()">
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
      <label for="company-name">Job Title</label>
      <input id="company-name" name="company-name" type="text" required />
    </div>

    <div class="form-control">
      <label for="opp-description">Job Description</label>
      <textarea
        id="opp-description"
        name="opp-description"
        type="text"
        rows="8"
        required
      ></textarea>
    </div>

    <div class="form-control">
      <label for="opp-cat">Job Category</label>
      <select id="opp-cat" name="opp-cat" v-model="oppCategory">
        <option value="marketing">Marketing</option>
        <option value="software">Software</option>
        <option value="design">Design</option>
        <option value="product">Product</option>
        <option value="sales">Sales</option>
        <option value="account-management">Account Management</option>
        <option value="warehousing">Warehouse</option>
        <option value="manufacturing">Manufacturing</option>
        <option value="supply-chain">Supply Chain</option>
      </select>
    </div>
    <div class="form-control">
      <h2>Job Attributes</h2>
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
      <button>Post Job!</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      oppTitle: "",
      oppCategory: null,
      oppAttributes: [],
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type="checkbox"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>

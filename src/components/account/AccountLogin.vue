<template>
  <div class="flex-column card" v-if="processing">
    <load-spinner></load-spinner>
  </div>

  <div class="flex-column card" v-else-if="newAccountMode">
    <h2>Join Our Community of Early Career Advocates 🔥</h2>
    <p>
      We're so excited that you're helping us make career building opportunities
      more accessible.
    </p>
    <form @submit.prevent="attemptSignUp()">
      <div class="form-control">
        <label for="signUpEmail">E-mail*</label>
        <input
          id="signUpEmail"
          name="signUpEmail"
          type="email"
          v-model.trim="signUpEmail"
        />
      </div>
      <div class="form-control">
        <label for="signUpPasswordOne">Password*</label>
        <input
          id="signUpPasswordOne"
          name="signUpPasswordOne"
          type="password"
          v-model.trim="signUpPasswordOne"
        />
      </div>
      <div class="form-control">
        <label for="signUpPasswordTwo">Confirm Password*</label>
        <input
          id="signUpPasswordTwo"
          name="signUpPasswordTwo"
          type="password"
          v-model.trim="signUpPasswordTwo"
        />
      </div>
      <div class="flex-row">
        <button class="link" type="submit" id="submit-btn">Sign Up</button>
        <a class="secondary-link" v-on:click="swapFormType()">
          Already Have an Account? Login
        </a>
      </div>
    </form>
    <div class="errors" v-if="error">{{ error }}</div>
  </div>

  <div class="flex-column card" v-else>
    <h2>👋 Welcome Back! Let's Get You Logged In.</h2>
    <form @submit.prevent="signInAttempt()">
      <div class="form-control">
        <label for="loginEmail">E-mail</label>
        <input
          id="loginEmail"
          name="loginEmail"
          type="email"
          v-model.trim="loginEmail"
        />
      </div>
      <div class="form-control">
        <label for="loginPassword">Password</label>
        <input
          id="loginPassword"
          name="loginPassword"
          type="password"
          v-model.trim="loginPassword"
        />
      </div>
      <div class="flex-row">
        <button class="link" id="submit-btn">Login</button>
        <a class="secondary-link" v-on:click="swapFormType()">Create Account</a>
      </div>
    </form>
    <div class="errors" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import LoadSpinner from "../ui/LoadSpinner.vue";
import firebaseInit from "../../firebaseInit.js";
import { mapState } from "vuex";

export default {
  components: { LoadSpinner },
  data() {
    return {
      processing: false,
      loginEmail: null,
      loginPassword: null,
      error: null,
      newAccountMode: true,
      signUpPasswordOne: null,
      signUpPasswordTwo: null,
      signUpEmail: null,
    };
  },
  computed: mapState(["currentUser"]),
  watch: {
    currentUser(newVal) {
      if (newVal != null && this.$store.getters.retrieveCurrentUser() != null) {
        this.$router.replace("/new-opportunity");
      }
    },
  },
  methods: {
    signInAttempt() {
      this.processing = true;
      firebaseInit
        .auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(() => {
          this.processing = false;
          this.$router.replace("/new-opportunity");
        })
        .catch(() => {
          this.processing = false;
          this.error = `A user with this email and password combination does not exist 😲`;
        });
    },
    attemptSignUp() {
      this.error = null;
      if (
        this.signUpEmail &&
        this.signUpPasswordOne.length > 6 &&
        this.signUpPasswordOne === this.signUpPasswordTwo
      ) {
        this.signUp();
      } else if (this.signUpEmail === null || this.signUpEmail === "") {
        this.error = "Please enter a valid email.";
      } else if (this.signUpPasswordOne != this.signUpPasswordTwo) {
        this.error = `Your passwords do not match each other. Please try again 😧`;
      } else {
        this.error = `This password is too short. Please use a password with letters and numbers that is at least seven characters long.`;
      }
    },
    signUp() {
      this.processing = true;
      firebaseInit
        .auth()
        .createUserWithEmailAndPassword(
          this.signUpEmail,
          this.signUpPasswordOne
        )
        .then(() => {
          this.processing = false;
          this.$router.replace("/new-opportunity");
        })
        .catch(() => {
          this.processing = false;
          this.error = `We were unable to create an account with these credentials. Please try again 😧`;
        });
    },
    swapFormType() {
      this.newAccountMode = !this.newAccountMode;
      this.error = null;
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 97%;
  font: inherit;
  margin-bottom: 1rem;
  border: 3px solid var(--rb-main);
  border-radius: 4px;
  height: 32px;
  padding-left: 4px;
  font-size: larger;
}

p {
  margin-top: 0px;
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

.errors {
  border: 3px solid rgb(128, 0, 0);
  background-color: rgba(255, 58, 58, 0.116);
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 18px;
}

.secondary-link {
  padding: 8px 8px 8px 8px;
  margin-top: 24px;
}

#submit-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
}
</style>

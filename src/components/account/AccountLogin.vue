<template>
  <div class="flex-column card" v-if="processing">
    <load-spinner></load-spinner>
  </div>

  <div class="flex-column card" v-else>
    <h2>Let's Get You Logged In!</h2>
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
      <button class="link" id="submit-btn">Login</button>
    </form>
  </div>
</template>

<script>
import LoadSpinner from "../ui/LoadSpinner.vue";
import firebaseInit from "../../firebaseInit.js";

export default {
  components: { LoadSpinner },
  data() {
    return {
      processing: false,
      loginEmail: null,
      loginPassword: null,
    };
  },
  methods: {
    signInAttempt() {
      this.processing = true;
      firebaseInit
        .auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then((userCredential) => {
          // Signed in
          this.$store.commit({
            type: "setCurrentUser",
            user: userCredential.user,
          });
          console.log("SUCCESS");
          console.log(userCredential);
          console.log(this.$store.getters.retrieveCurrentUser());
          this.processing = false;
          this.$router.replace("/new-opportunity");
          //const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          console.log("ERROR" + error);
          this.processing = false;
          //var errorCode = error.code;
          //var errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
  border: 3px solid var(--rb-main);
  border-radius: 4px;
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
}

#submit-btn {
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
}
</style>

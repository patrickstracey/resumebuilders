<template>
  <header>
    <div class="holder flex-row">
      <router-link to="/" id="home-link"><h1>resume🔨builders</h1></router-link>
      <router-link
        to="/new-opportunity"
        class="link"
        id="post-link"
        v-if="loggedIn === false"
        >📢 Post a Job <small>(it's free!)</small></router-link
      >
      <div class="flex-row" v-else>
        <router-link to="/new-opportunity" class="secondary-link"
          >Post a Job</router-link
        >
        <button @click="logout()" class="secondary-link">Log Out</button>
      </div>
    </div>
  </header>
</template>

<script>
import firebaseInit from "../../firebaseInit";
import { mapState } from "vuex";

export default {
  name: "TheHeader",
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    logout() {
      firebaseInit.auth().signOut();
      this.$router.replace("/");
    },
  },
  computed: mapState(["currentUser"]),
  watch: {
    currentUser(newVal) {
      if (newVal != null && this.$store.getters.retrieveCurrentUser() != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: unset;
  position: absolute;
  top: 0;
  left: 0;
}

h1 {
  color: var(--rb-main);
  margin: unset;
  text-decoration: none;
}

.holder {
  width: 90%;
  height: 100%;
  align-items: center;
  margin: auto;
}

.secondary-link {
  margin-top: auto;
  font: inherit;
  margin-left: 24px;
}

#post-link {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 21px;
  padding: 8px 16px 8px 16px;
  align-self: center;
}

#home-link {
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  #post-link {
    display: none;
  }

  .flex-row {
    justify-content: center;
  }
}
</style>

<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-card class="d-flex justify-center" flat color="transparent">
        <v-avatar color="indigo" size="128">
          <!-- {{userInitials(user)}} -->
        </v-avatar>

        <div class="accountInfo">
          <v-icon> mdi-account </v-icon>
          <span>{{ this.getUser.displayName }}<br /></span>

          <v-icon> mdi-email </v-icon>
          <span>{{ this.getUser.email }}<br /></span>
        </div>
      </v-card>
    </v-row>

    <v-container>
      <v-row class="d-flex flex-column">
        <v-card>
          <v-btn block class="btn">
            <v-icon> mdi-bus </v-icon>
            <span>Ride History<br /></span>
          </v-btn>
          <v-btn block class="btn">
            <v-icon> mdi-cash </v-icon>
            <span>Payment History<br /></span>
          </v-btn>
          <v-btn block class="btn">
            <v-icon> mdi-cog </v-icon>
            <span>Settings<br /></span>
          </v-btn>
          <v-btn @click="logout" block color="primary">
            <v-icon> mdi-logout </v-icon>
            Logout
          </v-btn>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  methods: {
    async logout() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({ name: "Login" });
      } catch (err) {
        console.log(err);
      }
    },

    userInitials(displayName) {
      const name = displayName.split(" ");
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ""}`;
    },
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  computed: {
    getUser() {
      const user = firebase.auth().currentUser;
      console.log(user);
      return user;
    },
  },
  name: "Account",
};
</script>

<style scoped>
.btn {
  color: light-grey;
}
</style>
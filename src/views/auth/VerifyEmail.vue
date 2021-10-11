<template>
  <v-container class="px-2">
    <v-card class="center px-2 mr-2">
      <v-card flat class="d-flex justify-center transparent">
        <img
          src="https://img.icons8.com/fluency/96/000000/send-mass-email.png"
        />
      </v-card>
      <h3 class="d-flex justify-center primary--text">Verify your email</h3>
      <p></p>
      <p class="secondary--text">
        We have sent a verification email to you, please click on the link in
        the email to access the UNIBUS app.
      </p>
    </v-card>
  </v-container>
</template>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<script>
export default {
  data() {
    return {
      displayName: "Charith",
    };
  },
};
</script>
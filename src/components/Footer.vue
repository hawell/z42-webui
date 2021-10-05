<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
          class="primary lighten-2 py-4 text-center white--text"
      >
      {{ new Date().getFullYear() }} — <strong>Zone42</strong>
      <Logo/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "./Logo";
export default {
  components: {Logo},
  data: () => ({
  }),
}
</script>

<style scoped>

</style>
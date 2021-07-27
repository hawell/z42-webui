<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" align="center">
      <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
      >
        {{ link }}
      </v-btn>
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
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
}
</script>

<style scoped>

</style>
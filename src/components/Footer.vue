<template>
  <v-footer
      color="primary lighten-1"
  >
    <v-row
        justify="center"
        no-gutters
    >
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
      <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Zone42</strong>
        <Logo/>
      </v-col>
    </v-row>
  </v-footer>
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
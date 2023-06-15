<template>
  <v-card
    :loading="loading"
  >
    <template slot="progress">
      <v-progress-linear
        height="10"
        indeterminate
      />
    </template>
    <v-card-title>
      Create a new account
      <v-spacer />
      <v-btn
        icon
        large
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Do you already have an account?
      <nuxt-link to="/login">
        Log in
      </nuxt-link>
    </v-card-subtitle>
    <v-card-text>
      <SignupForm
        @loading="update_loading"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import SignupForm from '../components/auth/Signup'
export default {
  name: 'Signup',
  auth: false,
  components: { SignupForm },
  layout: 'auth',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    update_loading (state) {
      this.loading = state
    }
  }
}
</script>

<style>
</style>

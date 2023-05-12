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
      Log In
      <v-spacer />
      <v-btn
        icon
        large
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Don't have an account?
      <nuxt-link to="/signup">
        Create now
      </nuxt-link>
    </v-card-subtitle>
    <v-card-text>
      <LoginForm
        @loading="update_loading"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import LoginForm from '../components/auth/Login'
export default {
  name: 'Login',
  auth: false,
  components: { LoginForm },
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

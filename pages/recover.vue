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
      Recover password
      <v-spacer />
      <v-btn
        icon
        large
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      <nuxt-link to="/login">
        Go back
      </nuxt-link>
    </v-card-subtitle>
    <v-card-text>
      <RecoverForm
        @loading="update_loading"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import RecoverForm from '../components/auth/Recover'
export default {
  name: 'Recover',
  auth: false,
  components: { RecoverForm },
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

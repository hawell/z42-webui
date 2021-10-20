<template>
  <v-alert
    class="text-center pl-3 pr-3 elevation-1"
    :value="hasNotification"
    :type="notification.type"
    dismissible
    prominent
    transition="slide-y-transition"
    @input="closeAlert"
  >
    {{ notification.message }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  computed: {
    notification () {
      return this.$store.state.notification.notification
    },
    hasNotification () {
      return this.$store.state.notification.notification !== ''
    }
  },
  updated () {
    setTimeout(() => { this.closeAlert() }, 3000)
  },
  methods: {
    closeAlert () {
      this.$store.commit('notification/clear_notification')
    }
  }
}
</script>

<style>
.v-alert {
  z-index: 20;
  position: fixed;
}
</style>

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
    notification: function () {
      return this.$store.getters.notification
    },
    hasNotification: function () {
      return this.$store.getters.hasNotification
    }
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('clear_notification')
    }
  },
  updated() {
    setTimeout(() => {this.closeAlert()}, 3000)
  }
};
</script>

<style>
.v-alert {
  z-index: 20;
  position: fixed;
}
</style>
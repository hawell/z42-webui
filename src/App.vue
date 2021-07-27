<template>
  <router-view/>
</template>

<script>

export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    },
  },
  created: function () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('restore', token)
    } else {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
    }

    const thisRef = this
    this.$http.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      console.log("response intercept")
      console.log(error.response.data)
      const originalRequest = error.config;
      if (error.response.status === 401 && error.response.data.message === 'Token is expired') {
        if  (thisRef.$store.getters.authStatus !== 'refreshing') {
          await thisRef.$store.dispatch('refresh')
          return thisRef.$http(originalRequest);
        } else {
          await thisRef.$router.push('/login')
        }
      }
      return Promise.reject(error);
    });
  }
}
</script>

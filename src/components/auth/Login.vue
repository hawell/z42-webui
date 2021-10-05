<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        prepend-icon="mdi-account"
        required
    ></v-text-field>
    <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        prepend-icon="mdi-lock"
        class="input-group--focused"
        @click:append="showPassword = !showPassword"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Min 8 characters',
    ],
    showPassword: false,
  }),
  methods: {
    submit: function(token) {
      let data = {
        email: this.email,
        password: this.password,
        token: token,
      }
      this.$store.dispatch('login', data)
          .then(() => this.$router.push('/'))
          .catch(err => {
            console.log(err)
            this.$store.dispatch( "set_notification", { message: "login failed",
              type: "error" }, { root: true });
          })
    }
  },
  watch: {
    valid(newValue) {
      this.$emit('validation', newValue)
    }
  },
  emits: ['validation']
}
</script>

<style scoped>

</style>
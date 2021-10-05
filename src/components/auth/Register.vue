<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
    ></v-text-field>
    <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        class="input-group--focused"
        @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="verifyPassword"
        :rules="[...passwordRules, passwordConfirmationRule]"
        :type="showPassword ? 'text' : 'password'"
        label="Verify Password"
        class="input-group--focused"
        @click:append="showPassword = !showPassword"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "RegisterForm",
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
    verifyPassword: '',
  }),
  methods: {
    submit: function(token) {
      let data = {
        email: this.email,
        password: this.password,
        token: token,
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.verifyPassword) || 'Password must match'
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
<template>
  <div>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          prepend-icon="mdi-account"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          class="input-group--focused"
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          v-model="verifyPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[...passwordRules, passwordConfirmationRule]"
          :type="showPassword ? 'text' : 'password'"
          label="Verify Password"
          class="input-group--focused"
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!valid || isLoading" :loading="isLoading" @click.prevent="submit">
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import validation from '../inputs/validation'

export default {
  name: 'RegisterForm',
  mixins: [validation],
  data: () => ({
    valid: false,
    isLoading: false,
    email: '',
    password: '',
    showPassword: false,
    verifyPassword: ''
  }),
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.verifyPassword) || 'Password must match'
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      this.$recaptcha.execute('login').then((recaptchaToken) => {
        const data = {
          email: this.email,
          password: this.password,
          recaptcha_token: recaptchaToken
        }
        this.$z42api.signup(data)
          .then(() => {
            this.isLoading = false
            this.$router.push('/')
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error('registration failed', { icon: 'error' })
            this.isLoading = false
          })
      })
    }
  }
}
</script>

<style scoped>

</style>

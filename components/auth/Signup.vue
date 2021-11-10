<template>
  <div>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <label><b>E-mail</b></label>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          required
          prepend-icon="mdi-account"
        />
        <label><b>Password</b></label>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          class="input-group--focused"
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
        />
        <label><b>Verify password</b></label>
        <v-text-field
          v-model="verifyPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[...passwordRules, passwordConfirmationRule]"
          :type="showPassword ? 'text' : 'password'"
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
  name: 'SignupForm',
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
    set_loading (state) {
      this.isLoading = state
      this.$emit('loading', state)
    },
    submit () {
      this.set_loading(true)
      this.$recaptcha.execute('login')
        .then((recaptchaToken) => {
          const data = {
            email: this.email,
            password: this.password,
            recaptcha_token: recaptchaToken
          }
          this.$z42api.signup(data)
            .then(() => {
              this.set_loading(false)
              this.$router.push('/verification')
            })
            .catch((err) => {
              console.log(err)
              this.$toast.error('registration failed', { icon: 'error' })
              this.set_loading(false)
            })
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('recaptcha error', { icon: 'error' })
          this.set_loading(false)
        })
    }
  }
}
</script>

<style scoped>

</style>

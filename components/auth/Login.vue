<template>
  <div>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          prepend-icon="mdi-account"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          class="input-group--focused"
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
  name: 'LoginForm',
  mixins: [validation],
  data: () => ({
    valid: false,
    isLoading: false,
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    submit () {
      this.isLoading = true
      this.$recaptcha.execute('login')
        .then((recaptchaToken) => {
          const user = {
            email: this.email,
            password: this.password,
            recaptcha_token: recaptchaToken
          }
          this.$auth.loginWith('local', { data: user })
            .then((resp) => {
              this.isLoading = false
              this.$auth.setUser({
                email: user.email,
                password: user.password,
                token: resp.token,
                expire: resp.expire
              })
              console.log('logged in')
              this.$router.push('/')
            })
            .catch((err) => {
              console.log(err)
              this.$toast.error('login failed', { icon: 'error' })
              this.isLoading = false
            })
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('recaptcha error', { icon: 'error' })
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

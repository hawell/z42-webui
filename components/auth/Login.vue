<template>
  <div>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <label><b>E-mail</b></label>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          prepend-icon="mdi-account"
        />
        <label><b>Password</b></label>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <nuxt-link to="/recover">
        Forgot your password?
      </nuxt-link>
      <v-spacer />
      <v-btn :disabled="!valid || isLoading" :loading="isLoading" @click.prevent="submit">
        Log in
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import validation from '../inputs/validation'

export default {
  name: 'LoginForm',
  mixins: [validation],
  emits: ['loading'],
  data: () => ({
    valid: false,
    isLoading: false,
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    set_loading (state) {
      this.isLoading = state
      this.$emit('loading', state)
    },
    submit () {
      this.set_loading(true)
      this.$recaptcha.execute('login')
        .then((recaptchaToken) => {
          const user = {
            email: this.email,
            password: this.password,
            recaptcha_token: recaptchaToken
          }
          this.$auth.loginWith('customStrategy', { data: user })
            .then((resp) => {
              this.set_loading(false)
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

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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!valid || isLoading" :loading="isLoading" @click.prevent="submit">
        Recover
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      max-width="500"
      @click:outside="exit"
    >
      <v-card>
        <v-card-title class="text-h5">
          Recovery EMail has been sent
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="exit"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import validation from '../inputs/validation'

export default {
  name: 'RecoverForm',
  mixins: [validation],
  data: () => ({
    dialog: false,
    message: '',
    valid: false,
    isLoading: false,
    email: ''
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
          const data = {
            email: this.email,
            recaptcha_token: recaptchaToken
          }
          this.$z42api.recover(data)
            .then((resp) => {
              this.set_loading(false)
              this.message = resp.message
              this.dialog = true
            })
            .catch((err) => {
              console.log(err)
              this.$toast.error('password recover failed', { icon: 'error' })
              this.set_loading(false)
            })
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('recaptcha error', { icon: 'error' })
          this.set_loading(false)
        })
    },
    exit () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>

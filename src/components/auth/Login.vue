<template>
  <div>
  <v-card-text>
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
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click.prevent="submit" :disabled="!valid || isLoading" :loading="isLoading">Submit</v-btn>
  </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    isLoading: false,
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
    submit: function() {
      this.isLoading = true
      this.$recaptchaLoaded().then(() => {
        this.$recaptcha("login").then((token) => {
          let data = {
            email: this.email,
            password: this.password,
            token: token,
          }
          this.$store.dispatch('login', data)
              .then(() => this.$router.push('/'))
              .then(() => {
                this.isLoading = false
              })
              .catch(err => {
                console.log(err)
                this.$store.dispatch( "set_notification", { message: "login failed",
                  type: "error" }, { root: true });
                this.isLoading = false
              })
        })
      })
    }
  },
}
</script>

<style scoped>

</style>
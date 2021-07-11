<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
              color="primary"
              dark
              flat
          >
            <v-toolbar-title>Welcome to Zone-42</v-toolbar-title>
            <v-spacer></v-spacer>
                <v-btn
                    icon
                    large
                >
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
          </v-toolbar>
          <v-card-text>
            <component :is="activeForm" ref="theForm" @validation="setValidation"/>
          </v-card-text>
          <v-card-actions>
            <v-tabs v-model="tab"><v-tab v-for="item of tabs" :key="item.id" :title="item.title" @click="activeForm=item.form">{{ item.title }}</v-tab></v-tabs>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="submit" :disabled="!isFormValid">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register"
export default {
  name: "Login",
  data() {
    return {
      isFormValid: false,
      activeForm: 'LoginForm',
      tab: null,
      tabs: [
        {
          form: 'LoginForm',
          title: 'Login'
        },
        {
          form: 'RegisterForm',
          title: 'Register'
        }
      ],
      forms: ['LoginForm', 'RegisterForm']
    }
  },
  components: {LoginForm, RegisterForm},
  methods: {
    setValidation(valid) {
      this.isFormValid = valid
    },
    submit() {
      this.$refs.theForm.submit()
    }
  },
}
</script>
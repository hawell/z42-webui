<template>
  <div>
    <v-row
      align="center"
      justify="center"
      class="vmid"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            dark
            flat
          >
            <v-toolbar-title>Welcome to Zone-42</v-toolbar-title>
            <v-spacer />
            <v-btn
              icon
              large
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <template #extension>
              <v-tabs v-model="tab">
                <v-tabs-slider />
                <v-tab v-for="item of tabs" :key="item.id" :title="item.title" @click="activeForm=item.form">
                  <v-icon left>
                    {{ item.icon }}
                  </v-icon>
                  {{ item.title }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <component :is="activeForm" ref="theForm" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginForm from '../components/auth/Login'
import RegisterForm from '../components/auth/Register'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
export default {
  name: 'Login',
  components: { Logo, Footer, LoginForm, RegisterForm },
  data () {
    return {
      activeForm: 'LoginForm',
      tab: null,
      tabs: [
        {
          form: 'LoginForm',
          title: 'Login',
          icon: 'mdi-login'
        },
        {
          form: 'RegisterForm',
          title: 'Register',
          icon: 'mdi-account-plus'
        }
      ],
      forms: ['LoginForm', 'RegisterForm']
    }
  },
  async mounted () {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>
.vmid {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

<template>
  <v-app>
    <Alert/>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="primary lighten-1"
        dark
        app
    >
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Zone - 42</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Logo/>
    </v-app-bar>

    <v-main>

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
                <template v-slot:extension>
                  <v-tabs v-model="tab" >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab v-for="item of tabs" :key="item.id" :title="item.title" @click="activeForm=item.form">
                      <v-icon left>{{ item.icon }}</v-icon>
                      {{ item.title }}
                    </v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>
              <component :is="activeForm" ref="theForm" />

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>

</template>

<script>
import LoginForm from "../components/auth/Login";
import RegisterForm from "../components/auth/Register"
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Alert from "../components/Alert";
export default {
  name: "Login",
  data() {
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
  components: {Alert, Logo, Footer, LoginForm, RegisterForm},
}
</script>
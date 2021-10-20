<template>
  <v-app>
    <Alert />
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item-group
          v-model="model"
          mandatory
          active-class="primary--text text--accent-4"
        >
          <NuxtLink v-for="(item, i) in items" :key="i" :to="item.page" style="text-decoration: none;">
            <v-list-item
              v-if="!item.auth || $auth.loggedIn"
              class="tile"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </NuxtLink>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Zone - 42</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn v-if="$auth.loggedIn" icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else icon to="/login" nuxt>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <Logo />
    </v-app-bar>
    <v-main>
      <v-container fluid class="full-height">
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Logo from '../components/Logo'
import Alert from '../components/Alert'
import Footer from '../components/Footer'

export default {
  name: 'Login',
  components: { Footer, Alert, Logo },
  data () {
    return {
      drawer: null,
      model: 0,
      items: [
        { icon: 'mdi-home', text: 'Home', page: '/', auth: false },
        { icon: 'mdi-earth', text: 'Zones', page: '/manage', auth: true },
        { icon: 'mdi-cog', text: 'Settings', page: '/settings', auth: true },
        { icon: 'mdi-api', text: 'API', page: '/api', auth: false },
        { icon: 'mdi-help-circle', text: 'Help', page: '/help', auth: false }
      ]
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      switch (this.$route.path) {
        case '/': this.model = 0; break
        case '/manage': this.model = 1; break
        case '/settings': this.model = 2; break
        case '/api': this.model = 3; break
        case '/help': this.model = 4; break
        default: this.model = null
      }
    } else {
      switch (this.$route.path) {
        case '/': this.model = 0; break
        case '/api': this.model = 1; break
        case '/help': this.model = 2; break
        default: this.model = null
      }
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.model = 0
    }
  }
}
</script>

<style>
</style>

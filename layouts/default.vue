<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item-group
          v-model="active_index"
          mandatory
          active-class="primary--text text--accent-4"
        >
          <NuxtLink v-for="(item) in items" :key="item.page" :to="item.page" style="text-decoration: none;">
            <v-list-item
              v-if="!item.auth || isAuthenticated"
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
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn v-if="isAuthenticated" icon @click="logout">
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
import { mapGetters } from 'vuex'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
export default {
  name: 'Default',
  components: { Footer, Logo },
  data () {
    return {
      drawer: null,
      active_index: 0,
      items: [
        { icon: 'mdi-home', text: 'Home', page: '/', auth: false },
        { icon: 'mdi-earth', text: 'Zones', page: '/zones', auth: true },
        { icon: 'mdi-cog', text: 'Settings', page: '/settings', auth: true },
        { icon: 'mdi-api', text: 'API', page: '/api', auth: false },
        { icon: 'mdi-help-circle', text: 'Help', page: '/help', auth: false }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  mounted () {
    if (this.$auth.loggedIn) {
      switch (this.$route.path) {
        case '/': this.active_index = 0; break
        case '/zones': this.active_index = 1; break
        case '/settings': this.active_index = 2; break
        case '/api': this.active_index = 3; break
        case '/help': this.active_index = 4; break
        default: this.active_index = null; break
      }
    } else {
      switch (this.$route.path) {
        case '/': this.active_index = 0; break
        case '/api': this.active_index = 1; break
        case '/help':this.active_index = 2; break
        default: this.active_index = null; break
      }
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$auth.reset()
          this.model = 0
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log('logout failed', err)
          this.$auth.reset()
          this.model = 0
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
</style>

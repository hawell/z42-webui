<template>
  <v-app>
    <Alert/>
    <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
    >
      <v-list dense>
        <v-list-item-group
            mandatory
            v-model="model"
            active-class="primary--text text--accent-4"
        >
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              class="tile"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="primary lighten-1"
        dark
        app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <Logo/>
    </v-app-bar>
    <v-main>
      <v-container>
        <Zones v-if="model === 0"/>
        <API v-else-if="model === 2" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from "../components/Logo";
import Zones from "../components/items/ManageZones";
import Alert from "../components/Alert";
import API from "../components/items/API";

export default {
  name: "Login",
  components: {API, Alert, Zones, Logo},
  data() {
    return {
      drawer: null,
      model: 0,
      items: [
        {icon: 'mdi-earth', text: 'Zones'},
        {icon: 'mdi-cog', text: 'Settings'},
        {icon: 'mdi-api', text: 'API'},
        {icon: 'mdi-help-circle', text: 'Help'},
      ],
    }
  },
}
</script>

<style>
  .grecaptcha-badge {
    visibility: hidden !important;
}
</style>

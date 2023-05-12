<template>
  <v-container>
    <v-row
      align="center"
    >
      <v-col cols="1" />
      <v-col cols="3">
        <v-card height="100%" elevation="0">
          <v-card-title>Zone-42 DNS</v-card-title>
          <v-card-subtitle>Fast, Secure, Modern Authoritative DNS</v-card-subtitle>
          <v-card-text>a modern authoritative DNS service. built-in security and advanced features</v-card-text>
          <v-divider />
          <v-card-actions class="mt-auto">
            <v-btn
              v-if="!$auth.loggedIn"
              @click.prevent="$router.push('/login')"
            >
              Get Started
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-img src="worldmap.svg" max-width="600" />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row
      v-for="(item, i) in items"
      :key="i"
      align="center"
    >
      <v-col cols="1">
        <v-btn
          fab
          x-large
          class="mx-2"
          elevation="2"
        >
          <v-icon>{{ item.image }}</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="7">
        <v-card height="100%">
          <v-card-title v-text="item.title" />
          <v-card-subtitle v-text="item.content" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  auth: false,
  data: () => ({
    items: [
      {
        title: 'One-click DNSSEC',
        image: 'mdi-lock-check',
        content: 'Zone-42 comes with built-in DNSSEC support. with dynamic record signing, DNSSEC deployment is just one click away'
      },
      {
        title: 'Alias names',
        image: 'mdi-approximately-equal',
        content: 'using our special ANAME records, you can have CNAME at root level'
      },
      {
        title: 'GEO IP',
        image: 'mdi-map-marker-check',
        content: 'filter and customize your IP (A, AAAA) responses based on request\'s original ip, location or asn'
      },
      {
        title: 'IP Response Filter',
        image: 'mdi-filter',
        content: 'apply weight to IPs, choose between single and multiple values in response, round-robin or weighted responses'
      },
      {
        title: 'Public API',
        image: 'mdi-api',
        content: 'OpenAPI v3.0 specification publicly available for use'
      },
      {
        title: 'Import/Export',
        image: 'mdi-swap-vertical-circle',
        content: 'import/export bind format zone file, easily'
      }
    ]
  })
}
</script>

<style scoped>

</style>

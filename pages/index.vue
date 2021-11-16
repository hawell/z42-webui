<template>
  <v-container>
    <v-row
      v-for="(item, i) in items"
      :key="i"
      align="center"
    >
      <v-col cols="1" align="center">
        <v-btn
          fab
          dark
          x-large
          class="mx-2"
          elevation="2"
        >
          <v-icon>{{ item.image }}</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="8">
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

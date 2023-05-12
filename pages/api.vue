<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Zone-42 Administrative API</v-toolbar-title>
          </v-toolbar>
          <v-list-item>
            <v-list-item-icon>
              <v-btn
                fab
                x-large
                class="mx-2"
                elevation="2"
                :href="openapi_file"
              >
                <v-icon>mdi-file-code-outline</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-title>Download latest API specification</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-btn
                fab
                x-large
                class="mx-2"
                elevation="2"
                :href="swagger_ui"
                target="_blank"
              >
                <v-icon>mdi-application-brackets-outline</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-title>Online documentation</v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'API',
  auth: false,
  asyncData: ({ $config }) => ({
    swagger_ui: $config.axios.baseURL + '/doc',
    openapi_file: $config.axios.baseURL + '/doc/openapi.yml'
  })
}
</script>

<style scoped>

</style>

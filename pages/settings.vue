<template>
  <v-card elevation="5" class="mb-4">
    <v-toolbar>
      <v-tabs v-model="tab">
        <v-tab>API Keys</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="ma-4 pa-4">
      <v-tab-item>
        <APIKeysTable />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import APIKeysTable from '../components/settings/APIKeysTable'
export default {
  name: 'Settings',
  components: { APIKeysTable },
  middleware: 'auth',
  data: () => ({
    tab: 0
  })
}
</script>

<style scoped>

</style>

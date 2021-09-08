<template>
  <v-card elevation="5" class="mb-4">
    <v-toolbar>
      <v-tabs v-model="tab">
        <v-tab>Settings</v-tab>
        <v-tab>Labels</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="ma-4 pa-4">
      <v-tab-item>
        <Settings
            :zone_name="zone_name"
        />
      </v-tab-item>
      <v-tab-item>
        <LocationTable
            :zone_name="zone_name"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Settings from "./Settings";
import LocationTable from "./LocationTable";

export default {
  name: "Zone",
  components: {LocationTable, Settings},
  props: [
    'zone_name',
  ],
  data: () => ({
    tab: 0,
  }),
}
</script>

<style scoped>

</style>
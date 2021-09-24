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
            @location_added="location_added"
            @location_removed="location_removed"
            @location_selected="location_selected"
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
  emits: ['location_added', 'location_removed', 'location_selected'],
  data: () => ({
    tab: 0,
  }),
  methods: {
    location_added(item) {
      this.$emit('location_added', item)
    },
    location_removed(item) {
      this.$emit('location_removed', item)
    },
    location_selected(item) {
      this.$emit('location_selected', item)
    }
  }
}
</script>

<style scoped>

</style>
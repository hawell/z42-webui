<template>
  <v-card elevation="5" class="mb-4">
    <v-toolbar>
      <v-tabs v-model="tab">
        <v-tab>Overview</v-tab>
        <v-divider
          vertical
          inset
        >
        </v-divider>
        <v-tab>Labels</v-tab>
        <v-tab>DNSSEC</v-tab>
        <v-tab>Import/Export</v-tab>
        <v-tab>Settings</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="ma-4 pa-4">
      <v-tab-item>
        <Overview
          :zone-name="zoneName"
        />
      </v-tab-item>
      <v-tab-item>
        <LocationTable
          :zone-name="zoneName"
          @location_added="location_added"
          @location_removed="location_removed"
          @location_selected="location_selected"
        />
      </v-tab-item>
      <v-tab-item>
        <DNSSEC
          :zone-name="zoneName"
        />
      </v-tab-item>
      <v-tab-item>
        <ImportExport
          :zone-name="zoneName"
          @zone_imported="zone_imported"
        />
      </v-tab-item>
      <v-tab-item>
        <Settings
          :zone-name="zoneName"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Settings from './Settings'
import LocationTable from './LocationTable'
import DNSSEC from './DNSSEC'
import ImportExport from './ImportExport'
import Overview from './Overview'

export default {
  name: 'Zone',
  components: { Overview, ImportExport, DNSSEC, LocationTable, Settings },
  props: {
    zoneName: {
      type: String,
      default: ''
    }
  },
  emits: ['location_added', 'location_removed', 'location_updated', 'location_selected', 'zone_imported'],
  data: () => ({
    tab: 1
  }),

  methods: {
    location_added (item) {
      this.$emit('location_added', item)
    },
    location_removed (item) {
      this.$emit('location_removed', item)
    },
    location_updated (item) {
      this.$emit('location_updated', item)
    },
    location_selected (item) {
      this.$emit('location_selected', item)
    },
    zone_imported () {
      this.$emit('zone_imported', this.zoneName)
    }
  }
}
</script>

<style scoped>

</style>

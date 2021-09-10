<template>
  <v-card elevation="5" class="mb-4">
    <ZoneTable
        @zone_added="zone_added"
        @zone_removed="zone_removed"
        @zone_selected="zone_selected"
    />
  </v-card>
</template>

<script>
import ZoneTable from "./ZoneTable";
export default {
  name: "Zones",
  components: {ZoneTable},
  emits: ['zone_added', 'zone_removed', 'zone_selected'],
  mounted() {
    console.log("Zones mounted")
  },
  methods: {
    zone_added(zoneName) {
      console.log('Zones: zone_add')
      this.$emit('zone_added', zoneName)
    },
    zone_removed(zoneName) {
      console.log('Zones: zone_removed')
      this.$emit('zone_removed', zoneName)
    },
    zone_selected(zoneName) {
      console.log('Zones: zone_selected')
      this.$emit('zone_selected', zoneName)
    }
  }
}
</script>

<style scoped>

</style>
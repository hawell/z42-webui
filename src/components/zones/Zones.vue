<template>
  <v-card elevation="5" class="mb-4">
    <ZoneTable/>
  </v-card>
</template>

<script>
import ZoneTable from "./ZoneTable";
export default {
  name: "Zones",
  components: {ZoneTable},
  mounted() {
    console.log("Zones mounted")
  }
}
</script>

<style scoped>

</style>
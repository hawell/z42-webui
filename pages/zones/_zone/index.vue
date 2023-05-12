<template>
  <div>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <Zone :zone-name="$route.params.zone"></Zone>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Zone from '../../../components/zone/Zone'
export default {
  name: 'ManageZone',
  components: { Zone },
  data() {
    return {
      items: [
        {
          text: 'Zones',
          disabled: false,
          nuxt: true,
          href: '/zones/'
        },
        {
          text: this.$route.params.zone,
          disabled: true,
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
  
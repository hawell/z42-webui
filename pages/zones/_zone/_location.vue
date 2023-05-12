<template>
  <div>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <Location
          :zone-name="$route.params.zone"
          :location="$route.params.location"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Location from '../../../components/location/Location'
export default {
  name: 'ManageLocation',
  components: { Location },
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
          disabled: false,
          nuxt: true,
          href: '/zones/' + this.$route.params.zone
        },
        {
          text: this.$route.params.location,
          disabled: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
  
<template>
  <div>
    <v-form v-model="valid">
      <v-card>
        <v-row class="ma-4">
          <v-col cols="4">
            <v-checkbox v-model="record_set.enabled" label="enabled" />
          </v-col>
          <v-col cols="4">
            <TTLSelect v-model.number="record_set.value.ttl" :label="'ttl'" />
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row class="ma-4">
          <v-col cols="8">
            <FQDN v-model="record_set.value.location" :label="'location'" />
          </v-col>
        </v-row>
      </v-card>
      <v-divider vertical />
    </v-form>
  </div>
</template>

<script>
import TTLSelect from '../inputs/TTLSelect'
import FQDN from '../inputs/FQDN'
import common from './common'
export default {
  name: 'ANAME',
  components: { FQDN, TTLSelect },
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        location: ''
      }
    }
  })
}
</script>

<style scoped>

</style>

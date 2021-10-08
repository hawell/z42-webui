<template>
  <div>
    <v-form v-model="valid">
    <v-card>
      <v-row class="ma-4">
        <v-col cols="4">
          <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-col cols="4">
          <TTLSelect :label="'ttl'" v-model.number="record_set.value.ttl"/>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="8">
          <FQDN :label="'location'" v-model="record_set.value.location"/>
        </v-col>
      </v-row>
    </v-card>
    <v-divider vertical/>
    </v-form>
  </div>
</template>

<script>
import common from "./common";
import TTLSelect from "../inputs/TTLSelect";
import FQDN from "../inputs/FQDN";
export default {
  name: 'ANAME',
  components: {FQDN, TTLSelect},
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        location: "",
      }
    },
  }),
}
</script>

<style scoped>

</style>
<template>
  <div>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="2">
          <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-spacer/>
        <v-col cols="4">
          <TTLSelect :label="'ttl'" v-model.number="record_set.value.ttl"/>
        </v-col>
      </v-row>
        <v-row class="ma-4">
        <v-col cols="12">
          <FQDN :label="'host'" v-model="record_set.value.host"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import common from "./common";
import TTLSelect from "../inputs/TTLSelect";
import FQDN from "../inputs/FQDN";
export default {
  name: 'CNAME',
  components: {FQDN, TTLSelect},
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        host: "",
      }
    },
  }),
}
</script>

<style scoped>

</style>
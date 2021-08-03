<template>
  <div>
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
          <FQDN :label="'domain'" v-model="record_set.value.domain"/>
        </v-col>
      </v-row>
    </v-card>
    <v-divider vertical/>
  </div>
</template>

<script>
import common from "./common";
import TTLSelect from "../inputs/TTLSelect";
import FQDN from "../inputs/FQDN";
export default {
  name: 'PTR',
  components: {FQDN, TTLSelect},
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        domain: "",
      }
    },
  }),
}
</script>

<style scoped>

</style>
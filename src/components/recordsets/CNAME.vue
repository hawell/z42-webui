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
        <v-col cols="12">
          <FQDN :label="'host'" v-model="record_set.value.host"/>
        </v-col>
      </v-row>
    </v-card>
    </v-form>
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
      enabled: true,
      value: {
        ttl: 300,
        host: "",
      }
    },
  }),
}
</script>

<style scoped>

</style>
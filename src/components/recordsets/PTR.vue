<template>
  <div>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="2">
          <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-col cols="2">
          <v-text-field label="ttl" type="number" v-model.number="record_set.value.ttl"/>
        </v-col>
        <v-col cols="8">
          <v-text-field label="domain" v-model="record_set.value.domain"/>
        </v-col>
      </v-row>
    </v-card>
    <v-divider vertical/>
  </div>
</template>

<script>
import common from "./common";
export default {
  name: 'PTR',
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
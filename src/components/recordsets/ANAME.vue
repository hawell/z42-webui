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
          <v-text-field label="location" v-model="record_set.value.location"/>
        </v-col>
        <v-spacer/>
      </v-row>
    </v-card>
    <v-divider vertical/>
  </div>
</template>

<script>
import common from "./common";
export default {
  name: 'ANAME',
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
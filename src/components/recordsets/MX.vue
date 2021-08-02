<template>
  <div>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="4">
          <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-col cols="4">
          <v-text-field label="ttl" type="number" v-model.number="record_set.value.ttl"/>
        </v-col>
      </v-row>
    </v-card>
    <v-divider vertical/>
    <v-card>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Records</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
        >
          <v-icon left>mdi-plus</v-icon>
          New Item
        </v-btn>
      </v-toolbar>
      <v-divider/>
    </v-card>
  </div>
</template>

<script>
import common from "./common";
export default {
  name: 'MX',
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        records: [],
      }
    },
  }),
}
</script>

<style scoped>

</style>
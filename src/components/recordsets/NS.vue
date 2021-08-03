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
            @click="record_set.value.records.push({host: ''})"
        >
          <v-icon left>mdi-plus</v-icon>
          New Item
        </v-btn>
      </v-toolbar>
      <v-divider/>
      <v-row class="ma-4" align="center" dense v-for="(item, key) in record_set.value.records" :key="key">
        <v-col cols="10">
          <FQDN :label="'host'"
                v-model="item.host"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
              x-small
              color="primary"
              @click="remove_item(key)"
          >
            <v-icon x-small>mdi-minus</v-icon>
          </v-btn>
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
  name: 'NS',
  components: {FQDN, TTLSelect},
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

  methods: {
    remove_item (index) {
      this.record_set.value.records.splice(index, 1)
    },
  },
}
</script>

<style scoped>

</style>
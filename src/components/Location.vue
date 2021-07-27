<template>
<v-card elevation="5" class="mb-4">
  <v-container>
    <v-tabs v-model="tab" class="pa-4">
      <v-tab v-for="(enabled, record_type) in records" :key="getKey(record_type)">
        <v-badge color="green" dot :value="enabled">
        {{ record_type }}
        </v-badge>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="ma-4 pa-4">
      <v-tab-item v-for="(enabled, record_type) in records" :key="getKey(record_type)">
        <IP v-bind:zone="zone_name" v-bind:label="location" v-bind:record_type="record_type" :key="getKey(record_type)" v-if="record_type === 'a'"/>
        <IP v-bind:zone="zone_name" v-bind:label="location" v-bind:record_type="record_type" :key="getKey(record_type)" v-else-if="record_type === 'aaaa'"/>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</v-card>
</template>

<script>
import IP from "./recordsets/IP";
import api from "../api";
export default {
  name: "Location",
  components: {IP},
  props: [
    'zone_name',
    'location',
  ],
  data: () => ({
    records: {'a': false, 'aaaa': false, 'cname': false, 'txt': false, 'ns': false, 'mx': false, 'srv': false, 'caa': false, 'ptr': false, 'tlsa': false, 'ds': false, 'aname': false},
    tab: null,
  }),
  methods: {
    getKey(record_type) {
      return this.location + '.' + this.zone_name + '/' + record_type
    }
  },
  mounted () {
    api.get_record_sets(this.zone_name, this.location)
        .then(resp => {
          console.log(resp.data)
          let thisRef = this
          resp.data.data.forEach(function (element) {
            thisRef.records[element.id] = element.enabled
          })
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch( "set_notification", { message: "get record sets failed",
            type: "error" }, { root: true });
        })
  },
}

</script>

<style scoped>

</style>
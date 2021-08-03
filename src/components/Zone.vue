<template>
  <v-card elevation="5" class="mb-4">
<v-container>
  <v-row>
    <v-col cols="4">
      <v-checkbox label="enabled" v-model="zone.enabled"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="4">
      <v-checkbox label="cname flattening" v-model="zone.cname_flattening"/>
    </v-col>
    <v-col cols="4">
      <v-checkbox label="dnssec" v-model="zone.dnssec"/>
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <v-subheader>SOA</v-subheader>
  <v-row>
    <v-col cols="8">
      <v-row>
        <v-col>
          <TTLSelect :label="'ttl'" v-model.number="zone.soa.ttl"/>
        </v-col>
        <v-col>
          <v-text-field label="ns" v-model="zone.soa.ns"/>
          <v-text-field label="mx" v-model="zone.soa.mbox"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TTLSelect :label="'refresh'" v-model.number="zone.soa.refresh"/>
          <TTLSelect :label="'retry'" v-model.number="zone.soa.retry"/>
        </v-col>
        <v-col>
          <TTLSelect :label="'expire'" v-model.number="zone.soa.expire"/>
          <TTLSelect :label="'minttl'" v-model.number="zone.soa.minttl"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field label="serial" v-model="zone.soa.serial" readonly disabled />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-card-actions>
    <v-spacer></v-spacer>
  <v-btn
      class="mr-4"
      color="primary"
      :loading="updating"
      :disabled="updating"
      @click="update"
  >
    <v-icon left>mdi-upload</v-icon>
    Update
  </v-btn>
  <v-btn
      class="mr-4"
      color="primary"
      :loading="refreshing"
      :disabled="refreshing"
      @click="refresh"
  >
    <v-icon left>mdi-refresh</v-icon>
    Refresh
  </v-btn>
  </v-card-actions>
</v-container>
</v-card>
</template>

<script>
import api from "../api";
import TTLSelect from "./inputs/TTLSelect";
export default {
  name: "Zone",
  components: {TTLSelect},
  props: [
    'zone_name',
  ],
  data: () => ({
    updating: false,
    refreshing: false,
    zone: {
      enabled: false,
      cname_flattening: false,
      dnssec: false,
      soa: {
        ttl: 0,
        ns: "",
        mbox: "",
        refresh: 0,
        retry: 0,
        expire: 0,
        minttl: 0,
        serial: 0,
      }
    }
  }),

  methods: {
    getData () {
      return api.get_zone(this.zone_name)
    },
    updateData () {
      return api.update_zone(this.zone_name, this.zone)
    },
    update () {
      this.updating = true
      this.updateData().then(resp => {
        console.log(resp.data)
        this.updating = false
      }).catch(err => {
        console.log(err)
        this.updating = false
      })
    },
    refresh () {
      this.refreshing = true
      this.getData().then(resp => {
        console.log(resp.data)
        this.zone = resp.data.data
        this.refreshing = false
      }).catch(err => {
        console.log(err)
        this.refreshing = false
      })
    },
  },

  created() {
    this.getData().then(resp => {
      console.log(resp.data)
      this.zone = resp.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
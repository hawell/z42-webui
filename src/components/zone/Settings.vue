<template>
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
            <FQDN label="ns" v-model="zone.soa.ns"/>
            <FQDN label="mx" v-model="zone.soa.mbox"/>
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
            <v-text-field label="serial" v-model="zone.soa.serial" readonly disabled/>
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
        <v-badge :value="is_modified" color="pink">
          Update
        </v-badge>
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
</template>

<script>
import TTLSelect from "../inputs/TTLSelect";
import api from "../../api";
import FQDN from "../inputs/FQDN";
export default {
  name: "Settings",
  props: ['zone_name'],
  components: {FQDN, TTLSelect},
  data: () => ({
    refreshed: true,
    is_modified: false,
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
    },
  }),
  methods: {
    getData() {
      return api.get_zone(this.zone_name)
    },
    updateData() {
      return api.update_zone(this.zone_name, this.zone)
    },
    update() {
      this.updating = true
      this.updateData().then(() => {
        this.updating = false
      }).then(() => {
        this.refresh()
      }).catch(err => {
        console.log(err)
        this.updating = false
      })
    },
    refresh() {
      this.refreshing = true
      this.getData().then(resp => {
        this.zone = resp.data.data
        this.refreshing = false
        this.is_modified = false
        this.refreshed = true
      }).catch(err => {
        console.log(err)
        this.refreshing = false
      })
    },
  },
  created() {
    this.getData().then(resp => {
      this.zone = resp.data.data
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    zone: {
      deep: true,
      handler: function () {
        if (this.refreshed) {
          this.refreshed = false
          return
        }
        this.is_modified = true
      }
    }
  },
}
</script>

<style scoped>

</style>
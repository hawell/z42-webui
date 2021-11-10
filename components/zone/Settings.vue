<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-checkbox v-model="zone.enabled" label="enabled" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox v-model="zone.cname_flattening" label="cname flattening" />
      </v-col>
      <v-col cols="4">
        <v-checkbox v-model="zone.dnssec" label="dnssec" />
      </v-col>
    </v-row>
    <v-divider />
    <v-subheader>SOA</v-subheader>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col>
            <TTLSelect v-model.number="zone.soa.ttl" :label="'ttl'" />
          </v-col>
          <v-col>
            <FQDN v-model="zone.soa.ns" label="ns" />
            <FQDN v-model="zone.soa.mbox" label="mx" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TTLSelect v-model.number="zone.soa.refresh" :label="'refresh'" />
            <TTLSelect v-model.number="zone.soa.retry" :label="'retry'" />
          </v-col>
          <v-col>
            <TTLSelect v-model.number="zone.soa.expire" :label="'expire'" />
            <TTLSelect v-model.number="zone.soa.minttl" :label="'minttl'" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="zone.soa.serial" label="serial" readonly disabled />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mr-4"
        :loading="updating"
        :disabled="updating"
        @click="update"
      >
        <v-icon left>
          mdi-upload
        </v-icon>
        <v-badge :value="is_modified" color="pink">
          Update
        </v-badge>
      </v-btn>
      <v-btn
        class="mr-4"
        :loading="refreshing"
        :disabled="refreshing"
        @click="refresh"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        Refresh
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import TTLSelect from '../inputs/TTLSelect'
import FQDN from '../inputs/FQDN'
export default {
  name: 'Settings',
  components: { FQDN, TTLSelect },
  props: {
    zoneName: {
      type: String,
      default: ''
    }
  },
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
        ns: '',
        mbox: '',
        refresh: 0,
        retry: 0,
        expire: 0,
        minttl: 0,
        serial: 0
      }
    }
  }),
  watch: {
    zone: {
      deep: true,
      handler () {
        if (this.refreshed) {
          this.refreshed = false
          return
        }
        this.is_modified = true
      }
    }
  },
  created () {
    this.getData().then((resp) => {
      this.zone = resp.data
    }).catch((err) => {
      this.$toast.error('get zone settings failed', { icon: 'error' })
      console.log(err)
    })
  },
  methods: {
    getData () {
      return this.$z42api.get_zone(this.zoneName)
    },
    updateData () {
      return this.$z42api.update_zone(this.zoneName, this.zone)
    },
    update () {
      this.updating = true
      this.updateData().then(() => {
        this.updating = false
      }).then(() => {
        this.$toast.success('update successful', { icon: 'check' })
        this.refresh()
      }).catch((err) => {
        console.log(err)
        this.$toast.error('update failed', { icon: 'error' })
        this.updating = false
      })
    },
    refresh () {
      this.refreshing = true
      this.getData().then((resp) => {
        this.zone = resp.data
        this.refreshing = false
        this.is_modified = false
        this.refreshed = true
        this.$toast.info('refreshed', { icon: 'info' })
      }).catch((err) => {
        console.log(err)
        this.$toast.error('refresh failed', { icon: 'error' })
        this.refreshing = false
      })
    }
  }
}
</script>

<style scoped>

</style>

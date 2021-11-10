<template>
  <v-card elevation="5" class="mb-4">
    <v-toolbar>
      <v-tabs v-model="tab">
        <v-tab v-for="name in tab_items" :key="getKey(name)">
          {{ name }}
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-menu
        offset-y
        transition="slide-y-transition"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            small
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="name in available_items"
            :key="name"
            link
            @click="add(name)"
          >
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-container>
      <v-tabs-items v-model="tab" class="ma-4 pa-4">
        <v-tab-item v-for="name in tab_items" :key="getKey(name)">
          <component
            :is="records[name].type"
            :key="getKey(name)"
            :empty="records[name].empty"
            :refreshing="records[name].refreshing"
            :updating="records[name].updating"
            :zone-name="zoneName"
            :location="location"
            :record-type="name"
            @refreshed="refreshed"
            @updated="updated"
            @modified="modified"
            @validation="validation"
          />
        </v-tab-item>
      </v-tabs-items>
      <v-divider vertical />
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="mr-4"
          :loading="updating"
          :disabled="in_progress || !valid"
          @click="update"
        >
          <v-icon left>
            mdi-upload
          </v-icon>
          <v-badge :value="is_modified" color="pink">
            {{ upstream_action() }}
          </v-badge>
        </v-btn>
        <v-btn
          class="mr-4"
          :loading="refreshing"
          :disabled="is_empty || in_progress"
          @click="refresh"
        >
          <v-icon left>
            mdi-refresh
          </v-icon>
          Refresh
        </v-btn>
        <v-btn
          class="mr-4"
          color="error"
          :loading="removing"
          :disabled="in_progress"
          @click="remove"
        >
          <v-icon left>
            mdi-delete
          </v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import ANAME from '../recordsets/ANAME'
import CAA from '../recordsets/CAA'
import CNAME from '../recordsets/CNAME'
import DS from '../recordsets/DS'
import IP from '../recordsets/IP'
import MX from '../recordsets/MX'
import NS from '../recordsets/NS'
import PTR from '../recordsets/PTR'
import SRV from '../recordsets/SRV'
import TLSA from '../recordsets/TLSA'
import TXT from '../recordsets/TXT'

export default {
  name: 'Location',
  components: { ANAME, CAA, CNAME, DS, IP, MX, NS, PTR, SRV, TLSA, TXT },
  props: {
    zoneName: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    valid: false,
    records: {
      a: { empty: true, type: 'IP', updating: false, refreshing: false, removing: false, modified: false },
      aaaa: { empty: true, type: 'IP', updating: false, refreshing: false, removing: false, modified: false },
      cname: { empty: true, type: 'CNAME', updating: false, refreshing: false, removing: false, modified: false },
      txt: { empty: true, type: 'TXT', updating: false, refreshing: false, removing: false, modified: false },
      ns: { empty: true, type: 'NS', updating: false, refreshing: false, removing: false, modified: false },
      mx: { empty: true, type: 'MX', updating: false, refreshing: false, removing: false, modified: false },
      srv: { empty: true, type: 'SRV', updating: false, refreshing: false, removing: false, modified: false },
      caa: { empty: true, type: 'CAA', updating: false, refreshing: false, removing: false, modified: false },
      ptr: { empty: true, type: 'PTR', updating: false, refreshing: false, removing: false, modified: false },
      tlsa: { empty: true, type: 'TLSA', updating: false, refreshing: false, removing: false, modified: false },
      ds: { empty: true, type: 'DS', updating: false, refreshing: false, removing: false, modified: false },
      aname: { empty: true, type: 'ANAME', updating: false, refreshing: false, removing: false, modified: false }
    },
    tab: 0,
    active_records: [],
    empty_records: []
  }),
  computed: {
    tab_items () {
      return this.active_records
    },
    available_items () {
      return this.empty_records
    },
    updating () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].updating
    },
    refreshing () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].refreshing
    },
    removing () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].removing
    },
    is_empty () {
      if (this.tab_items.length === 0) {
        return true
      }
      return this.records[this.tab_items[this.tab]].empty
    },
    in_progress () {
      if (this.tab_items.length === 0) {
        return true
      }
      return this.records[this.tab_items[this.tab]].updating ||
          this.records[this.tab_items[this.tab]].refreshing ||
          this.records[this.tab_items[this.tab]].removing
    },
    is_modified () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].modified
    }
  },
  created () {
    this.$z42api.get_record_sets(this.zoneName, this.location)
      .then((resp) => {
        const thisRef = this
        if (resp.data.items !== null) {
          resp.data.items.forEach(function (element) {
            if (element.id !== 'soa') {
              thisRef.records[element.id].empty = false
              thisRef.active_records.push(element.id)
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
        this.$toast.error('get record sets failed', { icon: 'error' })
      })
      .then(() => {
        for (const [key, value] of Object.entries(this.records)) {
          if (value.empty) {
            this.empty_records.push(key)
          }
        }
      })
  },
  methods: {
    getKey (recordType) {
      return this.location + '.' + this.zoneName + '/' + recordType
    },

    update () {
      this.records[this.tab_items[this.tab]].updating = true
    },

    updated (success, recordType) {
      this.records[recordType].updating = false
      if (success) {
        this.records[recordType].modified = false
        this.records[recordType].empty = false
        this.$toast.success('update successful', { icon: 'check' })
      } else {
        this.$toast.error('update failed', { icon: 'error' })
      }
    },

    refresh () {
      if (this.records[this.tab_items[this.tab]].empty) {
        return
      }
      this.records[this.tab_items[this.tab]].refreshing = true
    },

    refreshed (success, recordType) {
      this.records[recordType].refreshing = false
      if (success) {
        this.records[recordType].modified = false
        this.$toast.info('refreshed', { icon: 'info' })
      } else {
        this.$toast.info('failed to refresh', { icon: 'error' })
      }
    },

    modified (recordType) {
      this.records[recordType].modified = true
    },

    validation (valid) {
      this.valid = valid
    },

    add (recordType) {
      const index = this.empty_records.indexOf(recordType)
      if (index > -1) {
        this.records[recordType].empty = true
        this.records[recordType].updating = false
        this.records[recordType].refreshing = false
        this.records[recordType].removing = false
        this.records[recordType].modified = false
        this.empty_records.splice(index, 1)
        this.active_records.push(recordType)
        this.tab = this.tab_items.length - 1
      }
    },

    remove () {
      if (this.records[this.tab_items[this.tab]].empty) {
        this.empty_records.push(this.tab_items[this.tab])
        this.empty_records.sort()
        this.active_records.splice(this.tab, 1)
        this.tab = this.tab_items.length - 1
        return
      }
      this.records[this.tab_items[this.tab]].removing = true
      this.$z42api.delete_record_set(this.zoneName, this.location, this.tab_items[this.tab])
        .then(() => {
          this.empty_records.push(this.tab_items[this.tab])
          this.active_records.splice(this.tab, 1)
          this.empty_records.sort()
          this.tab = this.tab_items.length - 1
          this.records[this.tab_items[this.tab]].removing = false
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('cannot delete record set', { icon: 'error' })
          this.records[this.tab_items[this.tab]].removing = false
        })
    },

    upstream_action () {
      if (this.tab_items.length === 0) {
        return ''
      }
      if (this.records[this.tab_items[this.tab]].empty) {
        return 'Create'
      } else {
        return 'Update'
      }
    }
  }
}

</script>

<style scoped>

</style>

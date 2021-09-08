<template>
  <v-card elevation="5" class="mb-4">
    <v-toolbar>
      <v-tabs v-model="tab">
        <v-tab v-for="name in tab_items" :key="getKey(name)">
          {{ name }}
        </v-tab>
      </v-tabs>
      <v-spacer/>
      <v-menu
          offset-y
          transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
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
              v-bind:empty="records[name].empty"
              v-bind:refreshing="records[name].refreshing"
              @refreshed="refreshed"
              v-bind:updating="records[name].updating"
              @updated="updated"
              @modified="modified"
              v-bind:zone_name="zone_name"
              v-bind:location="location"
              v-bind:record_type="name"
              :key="getKey(name)"
          />
        </v-tab-item>
      </v-tabs-items>
      <v-divider vertical></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            class="mr-4"
            color="primary"
            :loading="updating"
            :disabled="in_progress"
            @click="update"
        >
          <v-icon left>mdi-upload</v-icon>
          <v-badge :value="is_modified" color="pink">
            {{ upstream_action() }}
          </v-badge>
        </v-btn>
        <v-btn
            class="mr-4"
            color="primary"
            :loading="refreshing"
            :disabled="is_empty || in_progress"
            @click="refresh"
        >
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
        <v-btn
            class="mr-4"
            color="error"
            :loading="removing"
            :disabled="in_progress"
            @click="remove"
        >
          <v-icon left>mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import ANAME from "../recordsets/ANAME";
import CAA from "../recordsets/CAA";
import CNAME from "../recordsets/CNAME";
import DS from "../recordsets/DS";
import IP from "../recordsets/IP";
import MX from "../recordsets/MX";
import NS from "../recordsets/NS";
import PTR from "../recordsets/PTR";
import SRV from "../recordsets/SRV";
import TLSA from "../recordsets/TLSA";
import TXT from "../recordsets/TXT";
import api from "../../api";

export default {
  name: "Location",
  components: {ANAME, CAA, CNAME, DS, IP, MX, NS, PTR, SRV, TLSA, TXT},
  props: [
    'zone_name',
    'location',
  ],
  data: () => ({
    records: {
      'a': {empty: true, type: 'IP', updating: false, refreshing: false, removing: false, modified: false},
      'aaaa': {empty: true, type: 'IP', updating: false, refreshing: false, removing: false, modified: false},
      'cname': {empty: true, type: 'CNAME', updating: false, refreshing: false, removing: false, modified: false},
      'txt': {empty: true, type: 'TXT', updating: false, refreshing: false, removing: false, modified: false},
      'ns': {empty: true, type: 'NS', updating: false, refreshing: false, removing: false, modified: false},
      'mx': {empty: true, type: 'MX', updating: false, refreshing: false, removing: false, modified: false},
      'srv': {empty: true, type: 'SRV', updating: false, refreshing: false, removing: false, modified: false},
      'caa': {empty: true, type: 'CAA', updating: false, refreshing: false, removing: false, modified: false},
      'ptr': {empty: true, type: 'PTR', updating: false, refreshing: false, removing: false, modified: false},
      'tlsa': {empty: true, type: 'TLSA', updating: false, refreshing: false, removing: false, modified: false},
      'ds': {empty: true, type: 'DS', updating: false, refreshing: false, removing: false, modified: false},
      'aname': {empty: true, type: 'ANAME', updating: false, refreshing: false, removing: false, modified: false},
    },
    tab: 0,
    active_records: [],
    empty_records: [],
  }),
  methods: {
    getKey(record_type) {
      return this.location + '.' + this.zone_name + '/' + record_type
    },

    update() {
      this.records[this.tab_items[this.tab]].updating = true
    },

    updated(record_type) {
      console.log('updated')
      this.records[record_type].updating = false
      this.records[record_type].modified = false
      this.records[record_type].empty = false
    },

    refresh() {
      if (this.records[this.tab_items[this.tab]].empty) {
        return
      }
      this.records[this.tab_items[this.tab]].refreshing = true
    },

    refreshed(record_type) {
      console.log('refreshed')
      this.records[record_type].refreshing = false
      this.records[record_type].modified = false
    },

    modified(record_type) {
      console.log('modified', record_type)
      this.records[record_type].modified = true
    },

    add(record_type) {
      const index = this.empty_records.indexOf(record_type)
      if (index > -1) {
        this.records[record_type].empty = true
        this.records[record_type].updating = false
        this.records[record_type].refreshing = false
        this.records[record_type].removing = false
        this.records[record_type].modified = false
        this.empty_records.splice(index, 1)
        this.active_records.push(record_type)
        this.tab = this.tab_items.length - 1
      }
    },

    remove() {
      if (this.records[this.tab_items[this.tab]].empty) {
        this.empty_records.push(this.tab_items[this.tab])
        this.empty_records.sort()
        this.active_records.splice(this.tab, 1)
        this.tab = this.tab_items.length - 1
        return
      }
      this.records[this.tab_items[this.tab]].removing = true
      api.delete_record_set(this.zone_name, this.location, this.tab_items[this.tab])
          .then(() => {
            this.empty_records.push(this.tab_items[this.tab])
            this.active_records.splice(this.tab, 1)
            this.empty_records.sort()
            this.tab = this.tab_items.length - 1
            this.records[this.tab_items[this.tab]].removing = false
          })
          .catch(err => {
            console.log(err)
            this.records[this.tab_items[this.tab]].removing = false
          })
    },

    upstream_action() {
      if (this.tab_items.length === 0) {
        return ""
      }
      if (this.records[this.tab_items[this.tab]].empty) {
        return "Create"
      } else {
        return "Update"
      }
    }
  },
  computed: {
    tab_items: function () {
      return this.active_records
    },
    available_items: function () {
      return this.empty_records
    },
    updating: function () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].updating
    },
    refreshing: function () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].refreshing
    },
    removing: function () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].removing
    },
    is_empty: function () {
      if (this.tab_items.length === 0) {
        return true
      }
      return this.records[this.tab_items[this.tab]].empty
    },
    in_progress: function () {
      if (this.tab_items.length === 0) {
        return true
      }
      return this.records[this.tab_items[this.tab]].updating ||
          this.records[this.tab_items[this.tab]].refreshing ||
          this.records[this.tab_items[this.tab]].removing
    },
    is_modified: function () {
      if (this.tab_items.length === 0) {
        return false
      }
      return this.records[this.tab_items[this.tab]].modified
    },
  },
  created() {
    api.get_record_sets(this.zone_name, this.location)
        .then(resp => {
          console.log(resp.data)
          let thisRef = this
          if (resp.data.data.items !== null) {
            resp.data.data.items.forEach(function (element) {
              if (element.id !== 'soa') {
                thisRef.records[element.id].empty = false
                thisRef.active_records.push(element.id)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch("set_notification", {
            message: "get record sets failed",
            type: "error"
          }, {root: true});
        })
        .then(() => {
          for (const [key, value] of Object.entries(this.records)) {
            if (value.empty) {
              this.empty_records.push(key)
            }
          }
        })
  },
}

</script>

<style scoped>

</style>
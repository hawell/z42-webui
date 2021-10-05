<template>
  <v-row>
    <v-col col="3"
    >
      <v-sheet class="pa-4 primary lighten-2" elevation="5">
        <v-text-field
            v-model="search"
            label="Filter"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox
            v-model="caseSensitive"
            dark
            hide-details
            label="Case sensitive"
        ></v-checkbox>
      </v-sheet>
      <v-sheet elevation="5" class="mb-4 fill-height">
        <v-treeview
            :items="items"
            :active.sync="active"
            :search="search"
            :filter="filter"
            :open.sync="open"
            :load-children="loadChildren"
            activatable
            transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon
                v-text="`${item.icon}`"
            ></v-icon>
          </template>
        </v-treeview>
      </v-sheet>
    </v-col>


    <v-col
        cols="9"
        class="text-center"
    >
      <template v-if="selected">
        <Location v-if="selected.type === 'label'"
                  :key="selected.id"
                  v-bind:zone_name="selected.parent"
                  v-bind:location="selected.name"
        />
        <Zone v-else-if="selected.type === 'zone'"
              :key="selected.id"
              v-bind:zone_name="selected.name"
              @location_added="add_location"
              @location_removed="remove_location"
              @location_selected="select_location"
        />
        <Zones v-else-if="selected.type === 'root'"
               :key="selected.id"
               @zone_added="add_zone"
               @zone_removed="remove_zone"
               @zone_selected="select_zone"
        />
      </template>
    </v-col>
  </v-row>

</template>

<script>
// const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
import Zone from "../components/zone/Zone";
import api from '../api'
import Location from "../components/location/Location";
import Zones from "../components/zones/Zones";

export default {
  name: "ManageZones",
  components: {Zones, Location, Zone},
  data: () => ({
    active: [],
    items: [
      {
        name: 'Zones',
        id: 'zones',
        type: 'root',
        children: [],
        icon: 'mdi-earth'
      },
    ],
    open: [],
    search: null,
    caseSensitive: false,
    updating: false,
    refreshing: false,

  }),
  computed: {
    filter() {
      return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
    },
    selected() {
      if (!this.active.length) return undefined
      const id = this.active[0]

      for (const zone of this.items[0].children) {
        if (zone.id === id) {
          return zone
        }
        for (const label of zone.children) {
          if (label.id === id) {
            return label
          }
        }
      }
      if (id === "zones") {
        return this.items[0]
      }
      return undefined
    }
  },
  methods: {
    load_zones(item) {
      return api.get_zones("", 0, 1000, true)
          .then(resp => {
            let items = resp.data.data.items
            if (items !== null) {
              items.forEach(function (element) {
                element.name = element.id
                element.icon = "mdi-domain"
                element.children = []
                element.type = 'zone'
              })
              item.children = items
            }
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch("set_notification", {
              message: "get zones failed",
              type: "error"
            }, {root: true});
          })
    },
    load_locations(item) {
      return api.get_locations(item.id, "", 0, 1000, true)
          .then(resp => {
            let items = resp.data.data.items ? resp.data.data.items : []
            if (items !== null) {
              items.forEach(function (element) {
                element.name = element.id
                element.id = element.name + '.' + item.id
                element.icon = "mdi-label"
                element.type = 'label'
                element.parent = item.id
              })
              item.children = items
            }
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch("set_notification", {
              message: "get locations failed",
              type: "error"
            }, {root: true});
          })
    },
    loadChildren(item) {
      if (item.name === 'Zones') {
        return this.load_zones(item)
      } else {
        return this.load_locations(item)
      }
    },
    add_location(item) {
      if (this.items[0].children.length > 0) {
        this.items[0].children.some(function (zone) {
          if (zone.id === item.zone_name) {
            if (zone.children.length > 0) {
              let location = {
                name: item.location,
                id: item.location + '.' + item.zone_name,
                icon: "mdi-label",
                type: 'label',
                parent: item.zone_name
              }
              zone.children.push(location)
            }
            return true
          }
          return false
        })
      }
    },
    remove_location(item) {
      if (this.items[0].children.length > 0) {
        this.items[0].children.some(function (zone) {
          if (zone.id === item.zone_name) {
            if (zone.children.length > 0) {
              zone.children.some(function (location, index, object) {
                if (location.id === item.location + '.' + item.zone_name) {
                  object.splice(index, 1)
                  return true
                }
                return false
              })
            }
            return true
          }
          return false
        })
      }
    },
    select_location(location) {
      let key = location.location + '.' + location.zone_name
      if (this.open.length === 0) {
        this.open = ['zones']
      }
      let thisRef = this
      this.items[0].children.some(function (item) {
        if (item.name === location.zone_name) {
          if (item.children.length === 0) {
            thisRef.load_locations(item).then(() => {
              thisRef.open.push(item.id)
              thisRef.active = [key]
            })
          } else {
            if (!thisRef.open.includes(key)) {
              thisRef.open.push(key)
            }
            thisRef.active = [key]
          }
          return true
        }
        return false
      })
    },
    add_zone(zoneName) {
      if (this.items[0].children.length > 0) {
        let zone = {
          id: zoneName,
          name:zoneName,
          icon: "mdi-domain",
          children: [],
          type: 'zone',
        }
        this.items[0].children.push(zone)
      }
    },
    remove_zone(zoneName) {
      if (this.items[0].children.length > 0) {
        this.items[0].children.some(function (item, index, object) {
          if (item.id === zoneName) {
            object.splice(index, 1)
            return true
          }
          return false
        })
      }
    },
    select_zone(zoneName) {
      if (this.items[0].children.length === 0) {
        this.load_zones(this.items[0]).then(() => {
          this.open = ['zones']
          this.active = [zoneName]
        })
      } else {
        if (this.open.length === 0) {
          this.open = ['zones']
        }
        this.active = [zoneName]
      }
    }
  },
}
</script>

<style scoped>

</style>
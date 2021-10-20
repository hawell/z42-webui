<template>
  <v-row>
    <v-col
      col="3"
    >
      <v-sheet class="pa-4" elevation="5">
        <v-text-field
          v-model="search"
          label="Filter"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        />
        <v-checkbox
          v-model="caseSensitive"
          dark
          hide-details
          label="Case sensitive"
        />
      </v-sheet>
      <v-sheet elevation="5" class="mb-4">
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
          <template #prepend="{ item }">
            <v-icon
              v-text="`${item.icon}`"
            />
          </template>
        </v-treeview>
      </v-sheet>
    </v-col>

    <v-col
      cols="9"
      class="text-center"
    >
      <template v-if="selected">
        <Location
          v-if="selected.type === 'label'"
          :key="selected.id"
          :zone-name="selected.parent"
          :location="selected.name"
        />
        <Zone
          v-else-if="selected.type === 'zone'"
          :key="selected.id"
          :zone-name="selected.name"
          @location_added="add_location"
          @location_removed="remove_location"
          @location_selected="select_location"
        />
        <Zones
          v-else-if="selected.type === 'root'"
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
import Zone from '../components/zone/Zone'
import Location from '../components/location/Location'
import Zones from '../components/zones/Zones'

export default {
  name: 'ManageZones',
  components: { Zones, Location, Zone },
  data: () => ({
    active: [],
    items: [
      {
        name: 'Zones',
        id: 'zones',
        type: 'root',
        children: [],
        icon: 'mdi-earth'
      }
    ],
    open: [],
    search: null,
    caseSensitive: false,
    updating: false,
    refreshing: false

  }),
  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].includes(search)
        : undefined
    },
    selected () {
      if (!this.active.length) { return undefined }
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
      if (id === 'zones') {
        return this.items[0]
      }
      return undefined
    }
  },
  methods: {
    load_zones (item) {
      return this.$z42api.get_zones('', 0, 1000, true)
        .then((resp) => {
          const items = resp.data.items
          if (items !== null) {
            items.forEach(function (element) {
              element.name = element.id
              element.icon = 'mdi-domain'
              element.children = []
              element.type = 'zone'
            })
            item.children = items
          }
        })
        .catch((error) => {
          console.log(error)
          this.$store.commit('notification/set_notification', {
            message: 'get zones failed',
            type: 'error'
          }, { root: true })
        })
    },
    load_locations (item) {
      return this.$z42api.get_locations(item.id, '', 0, 1000, true)
        .then((resp) => {
          const items = resp.data.items ? resp.data.items : []
          if (items !== null) {
            items.forEach(function (element) {
              element.name = element.id
              element.id = element.name + '.' + item.id
              element.icon = 'mdi-label'
              element.type = 'label'
              element.parent = item.id
            })
            item.children = items
          }
        })
        .catch((error) => {
          console.log(error)
          this.$store.dispatch('set_notification', {
            message: 'get locations failed',
            type: 'error'
          }, { root: true })
        })
    },
    loadChildren (item) {
      if (item.name === 'Zones') {
        return this.load_zones(item)
      } else {
        return this.load_locations(item)
      }
    },
    add_location (item) {
      if (this.items[0].children.length > 0) {
        this.items[0].children.some(function (zone) {
          if (zone.id === item.zoneName) {
            if (zone.children.length > 0) {
              const location = {
                name: item.location,
                id: item.location + '.' + item.zoneName,
                icon: 'mdi-label',
                type: 'label',
                parent: item.zoneName
              }
              zone.children.push(location)
            }
            return true
          }
          return false
        })
      }
    },
    remove_location (item) {
      if (this.items[0].children.length > 0) {
        this.items[0].children.some(function (zone) {
          if (zone.id === item.zoneName) {
            if (zone.children.length > 0) {
              zone.children.some(function (location, index, object) {
                if (location.id === item.location + '.' + item.zoneName) {
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
    select_location (location) {
      const key = location.location + '.' + location.zoneName
      if (this.open.length === 0) {
        this.open = ['zones']
      }
      const thisRef = this
      this.items[0].children.some(function (item) {
        if (item.name === location.zoneName) {
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
    add_zone (zoneName) {
      if (this.items[0].children.length > 0) {
        const zone = {
          id: zoneName,
          name: zoneName,
          icon: 'mdi-domain',
          children: [],
          type: 'zone'
        }
        this.items[0].children.push(zone)
      }
    },
    remove_zone (zoneName) {
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
    select_zone (zoneName) {
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
  }
}
</script>

<style scoped>

</style>

<template>

  <v-container fluid class="fill-height">
    <v-row
        class="fill-height"
        justify="left"
    >
      <v-col
          cols="3"
      >
          <v-sheet class="pa-4 primary lighten-2">
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
          <v-sheet>
            <v-treeview
                :active.sync="active"
                :items="items"
                :load-children="fetchZones"
                :search="search"
                :filter="filter"
                :open.sync="open"
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

      <v-divider vertical></v-divider>

      <v-col
          class="d-flex text-center"
      >
        <v-scroll-y-transition mode="out-in"></v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  name: "Zones",
  data: () => ({
    active: [],
    zones: [],
    open: [],
    search: null,
    caseSensitive: false,
  }),
  computed: {
    items () {
      return [
        {
          name: 'Zones',
          type: 'root',
          children: this.zones,
          icon: 'mdi-earth'
        },
      ]
    },
    filter () {
      return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
    },
  },
  methods: {
    async fetchZones (item) {
      await pause(200)
      if (item.name === 'Zones') {
        let res = [
          {id: "1", name: "zone1.com", children: [], icon: "mdi-domain", type: "domain"},
          {id: "2", name: "zone2.com", children: [], icon: "mdi-domain", type: "domain"}
        ]
        return item.children.push(...res)
      } else {
        let res = [
          {id: item.id+"1", name: "@", icon: "mdi-label", type: "label"},
          {id: item.id+"2", name: "www", icon: "mdi-label", type: "label"}
        ]
        return item.children.push(...res)
      }
    }
  }
}
</script>

<style scoped>

</style>
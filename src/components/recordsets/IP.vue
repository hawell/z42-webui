<template>
  <div>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="4">
      <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-col cols="4">
      <v-text-field label="ttl" type="number" v-model.number="record_set.value.ttl"/>
        </v-col>
      </v-row>
    </v-card>
    <v-divider vertical/>
  <v-data-table
      :headers="headers"
      :loading="isLoading"
      :items="record_set.value.records"
      sort-by="ip"
      class="elevation-1"
      style="width: 100vw"
  >
    <template v-slot:top>
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
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.ip"
                        label="ip"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        :value="editedItem.weight"
                        @input="editedItem.weight = $event !== '' ? $event : null"
                        type="number"
                        label="weight"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.country"
                        label="country"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.asn"
                        label="asn"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDelete">Cancel</v-btn>
              <v-btn text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
    <v-divider vertical/>
    <v-card>
      <v-card-title>Filter settings</v-card-title>
      <v-row class="ma-4">
        <v-col cols="4">
      <v-select
          label="count"
          v-model="record_set.value.filter.count"
          :items="filterCountOptions"
          item-text="text"
          item-value="name"
      />
        </v-col>
        <v-col cols="4">
      <v-select
          label="order"
          v-model="record_set.value.filter.order"
          :items="filterOrderOptions"
          item-text="text"
          item-value="name"
      />
        </v-col>
        <v-col cols="4">
      <v-select
          label="geo filter"
          v-model="record_set.value.filter.geo_filter"
          :items="filterGeoOptions"
          item-text="text"
          item-value="name"
          persistent-hint
      />
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
import common from "./common";
export default {
  name: 'IP',
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        filter: {
          count: "",
          order: "",
          geo_filter: "",
        },
        records: [],
      }
    },
    isLoading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'IP Address', align: 'start', value: 'ip' },
      { text: 'Weight', value: 'weight' },
      { text: 'Country', value: 'country' },
      { text: 'ASN', value: 'asn' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      ip: '',
      weight: 0,
      country: [],
      asn: [],
    },
    defaultItem: {
      ip: '',
      weight: 0,
      country: [],
      asn: [],
    },
    filterCountOptions: [
      {name: 'single', text: 'single result'},
      {name: 'multi', text: 'multiple results'}
    ],
    filterOrderOptions: [
      {name: 'weighted', text: 'weighted'},
      {name: 'rr', text: 'round robin'},
      {name: 'none', text: 'none'}
    ],
    filterGeoOptions: [
      {name: 'country', text:'country'},
      {name: 'location', text:'location'},
      {name: 'asn', text:'asn'},
      {name: 'asn+country', text:'asn and country'},
      {name: 'none', text:'none'},
    ],
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New IP' : 'Edit IP'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    dialogDelete (val) {
      val || this.closeDelete()
    },

  },

  methods: {

    initialize () {
      if (this.empty) {
        return
      }
      this.isLoading = true
      this.getData().then(() => {
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },

    editItem (item) {
      this.editedIndex = this.record_set.value.records.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.record_set.value.records.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.record_set.value.records.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.record_set.value.records[this.editedIndex], this.editedItem)
      } else {
        this.record_set.value.records.push(this.editedItem)
      }
      this.close()
    },

  },
}
</script>

<style scoped>

</style>
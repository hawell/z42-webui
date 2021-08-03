<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="primary" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
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
                    @input="editedItem.weight = $event !== '' ? parseInt($event) : null"
                    type="number"
                    label="weight"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
              >
                <CountrySelect v-model="editedItem.country"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-text-field
                    :value="editedItem.asn"
                    @input="editedItem.asn = $event !== '' ? $event.split(',').filter(x => x.trim().length && !isNaN(x)).map(Number) : null"
                    label="asn"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-row class="ma-4">
        <v-col cols="4">
      <v-checkbox label="enabled" v-model="record_set.enabled"/>
        </v-col>
        <v-col cols="4">
          <TTLSelect :label="'ttl'" v-model.number="record_set.value.ttl"/>
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
          <v-btn
              color="primary"
              class="mb-2"
              @click="editItem(defaultItem)"
          >
            New Item
          </v-btn>
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
import table from "./table";
import CountrySelect from "../inputs/CountrySelect";
import TTLSelect from "../inputs/TTLSelect";
export default {
  name: 'IP',
  components: {TTLSelect, CountrySelect},
  mixins: [table],
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
    headers: [
      { text: 'IP Address', align: 'start', value: 'ip' },
      { text: 'Weight', value: 'weight' },
      { text: 'Country', value: 'country' },
      { text: 'ASN', value: 'asn' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
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
}
</script>

<style scoped>

</style>
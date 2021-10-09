<template>
  <div>
    <v-form v-model="valid">
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
    <RecordTable
        :headers="headers"
        :items="record_set.value.records"
        :sort_by="'ip'"
        :default_item="defaultItem"
        @addItem="addItem($event)"
        @editItem="editItem($event)"
        @deleteItem="deleteItem($event)"
    >
      <template v-slot:dialog="slotProps">
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <Ip4Input v-if="record_type === 'a'" label="ip" v-model="slotProps.item.ip"></Ip4Input>
              <Ip6Input v-else label="ip" v-model="slotProps.item.ip"></Ip6Input>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="slotProps.item.weight"
                  label="weight"
                  :rules="[onlyNumber(), min(0), max(100)]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
            >
              <CountrySelect v-model="slotProps.item.country"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
            >
              <v-text-field
                  :value="slotProps.item.asn"
                  @input="slotProps.item.asn = $event !== '' ? $event.split(',').filter(x => x.trim().length && !isNaN(x)).map(Number) : null"
                  label="asn"
                  :rules="[numbers()]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </RecordTable>
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
    </v-form>
  </div>
</template>

<script>
import TTLSelect from "../inputs/TTLSelect";
import RecordTable from "./RecordTable";
import table from "./table";
import CountrySelect from "../inputs/CountrySelect";
import Ip4Input from "../inputs/Ip4Input";
import Ip6Input from "../inputs/Ip6Input";
import validation from "../inputs/validation";
export default {
  name: 'IP',
  components: {Ip6Input, Ip4Input, CountrySelect, RecordTable, TTLSelect},
  mixins: [table, validation],
  data: () => ({
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
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
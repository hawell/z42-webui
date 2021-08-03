<template>
  <div>
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
        :sort_by="'usage'"
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
              <v-text-field
                  :value="slotProps.item.usage"
                  @input="slotProps.item.usage = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="usage"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.selector"
                  @input="slotProps.item.selector = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="selector"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.matching_type"
                  @input="slotProps.item.matching_type = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="matching type"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="slotProps.item.certificate"
                  label="certificate"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </RecordTable>
  </div>
</template>

<script>
import table from "./table";
import TTLSelect from "../inputs/TTLSelect";
import RecordTable from "./RecordTable";
export default {
  name: 'TLSA',
  components: {RecordTable, TTLSelect},
  mixins: [table],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        records: [],
      }
    },
    headers: [
      { text: 'Usage', align: 'start', value: 'usage' },
      { text: 'Selector', value: 'selector' },
      { text: 'Matching Type', value: 'matching_type' },
      { text: 'Certificate', value: 'certificate'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    defaultItem: {
      usage: 0,
      selector: 0,
      matching_type: 0,
      certificate: "",
    },
  }),
}
</script>

<style scoped>

</style>
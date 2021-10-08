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
        :sort_by="'host'"
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
              <FQDN
                  v-model="slotProps.item.host"
                  label="host"
              ></FQDN>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.preference"
                  label="preference"
                  :rules="[onlyNumber(), min(0), max(65535)]"
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
import FQDN from "../inputs/FQDN";
import validation from "../inputs/validation";
export default {
  name: 'MX',
  components: {FQDN, RecordTable, TTLSelect},
  mixins: [table, validation],
  data: () => ({
    record_set: {
      enabled: false,
      value: {
        ttl: 0,
        records: [],
      }
    },
    headers: [
      { text: 'Host', align: 'start', value: 'host' },
      { text: 'Preference', value: 'preference' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    defaultItem: {
      host: "",
      preference: 0,
    },
  }),
}
</script>

<style scoped>

</style>
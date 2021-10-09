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
        :sort_by="'target'"
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
            >
              <FQDN
                  v-model="slotProps.item.target"
                  label="target"
              ></FQDN>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.priority"
                  label="priority"
                  :rules="[onlyNumber(), min(0), max(65535)]"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.weight"
                  label="weight"
                  :rules="[onlyNumber(), min(0), max(65535)]"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.port"
                  label="port"
                  :rules="[onlyNumber(), min(0), max(65535)]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </RecordTable>
    </v-form>
  </div>
</template>

<script>
import table from "./table";
import TTLSelect from "../inputs/TTLSelect";
import RecordTable from "./RecordTable";
import FQDN from "../inputs/FQDN";
import validation from "../inputs/validation";
export default {
  name: 'SRV',
  components: {FQDN, RecordTable, TTLSelect},
  mixins: [table, validation],
  data: () => ({
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        records: [],
      }
    },
    headers: [
      { text: 'Target', align: 'start', value: 'target' },
      { text: 'Priority', value: 'priority' },
      { text: 'Weight', value: 'weight' },
      { text: 'Port', value: 'port'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    defaultItem: {
      target: "",
      priority: 0,
      weight: 0,
      port: 0,
    },
  }),
}
</script>

<style scoped>

</style>
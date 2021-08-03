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
              <v-text-field
                  v-model="slotProps.item.target"
                  label="target"
              ></v-text-field>
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
                  @input="slotProps.item.priority = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="priority"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.weight"
                  @input="slotProps.item.weight = $event !== '' ? parseInt($event) : null"
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
                  :value="slotProps.item.port"
                  @input="slotProps.item.port = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="port"
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
  name: 'SRV',
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
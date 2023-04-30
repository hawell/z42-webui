<template>
  <div>
    <v-form v-model="valid">
      <v-card>
        <v-row class="ma-4">
          <v-col cols="4">
            <v-checkbox v-model="record_set.enabled" label="enabled" />
          </v-col>
          <v-col cols="4">
            <TTLSelect v-model.number="record_set.value.ttl" :label="'ttl'" />
          </v-col>
        </v-row>
      </v-card>
      <v-divider vertical />
      <RecordTable
        :headers="headers"
        :items="record_set.value.records"
        :sort-by="'target'"
        :default-item="defaultItem"
        @addItem="addItem($event)"
        @editItem="editItem($event)"
        @deleteItem="deleteItem($event)"
      >
        <template #dialog="slotProps">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <FQDN
                  v-model="slotProps.item.target"
                  label="target"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="slotProps.item.priority"
                  label="priority"
                  :rules="[onlyNumber(), min(0), max(65535)]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="slotProps.item.weight"
                  label="weight"
                  :rules="[onlyNumber(), min(0), max(65535)]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="slotProps.item.port"
                  label="port"
                  :rules="[onlyNumber(), min(0), max(65535)]"
                />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </RecordTable>
    </v-form>
  </div>
</template>

<script>
import TTLSelect from '../inputs/TTLSelect'
import FQDN from '../inputs/FQDN'
import validation from '../inputs/validation'
import RecordTable from './RecordTable'
import table from './table'
export default {
  name: 'SRV',
  components: { FQDN, RecordTable, TTLSelect },
  mixins: [table, validation],
  data: () => ({
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        records: []
      }
    },
    headers: [
      { text: 'Target', value: 'target', align: 'left' },
      { text: 'Priority', value: 'priority', align: 'left' },
      { text: 'Weight', value: 'weight', align: 'left' },
      { text: 'Port', value: 'port', align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      target: '',
      priority: 0,
      weight: 0,
      port: 0
    }
  })
}
</script>

<style scoped>

</style>

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
        :sort-by="'tag'"
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
                sm="6"
                md="4"
              >
                <v-select
                  v-model="slotProps.item.tag"
                  :items="['issue', 'issuewild', 'iode']"
                  label="tag"
                  :rules="[required()]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="[0, 128]"
                  v-model="slotProps.item.flag"
                  label="flag"
                  :rules="[]"
                  @input="slotProps.item.flag = $event !== '' ? parseInt($event) : 0"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <FQDN
                  v-model="slotProps.item.value"
                  label="value"
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
  name: 'CAA',
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
      { text: 'Tag', value: 'tag', align: 'left' },
      { text: 'Value', value: 'value', align: 'left' },
      { text: 'Flag', value: 'flag', align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      tag: 'issue',
      value: '',
      flag: 0
    }
  })
}
</script>

<style scoped>

</style>

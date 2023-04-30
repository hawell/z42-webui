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
        :sort-by="'usage'"
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
                  :items="usages"
                  item-text="name"
                  item-value="value"
                  v-model="slotProps.item.usage"
                  label="usage"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="selectors"
                  item-text="name"
                  item-value="value"
                  v-model="slotProps.item.selector"
                  label="selector"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="matching_types"
                  item-text="name"
                  item-value="value"
                  v-model="slotProps.item.matching_type"
                  label="matching type"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="slotProps.item.certificate"
                  label="certificate"
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
import table from './table'
import RecordTable from './RecordTable'
export default {
  name: 'TLSA',
  components: { RecordTable, TTLSelect },
  mixins: [table],
  data: () => ({
    usages: [
      { value: 0, name: '0 (PKIX-TA)', description: 'CA constraint' },
      { value: 1, name: '1 (PKIX-EE)', description: 'Service certificate constraint' },
      { value: 2, name: '2 (DANE-TA)', description: 'Trust anchor assertion' },
      { value: 3, name: '3 (DANE-EE)', description: 'Domain-issued certificate' },
      { value: 255, name: '255 (PrivCert)', description: 'Private Use' }
    ],
    selectors: [
      { value: 0, name: '0 (Cert)', description: 'Full certificate' },
      { value: 1, name: '1 (SPKI)', description: 'SubjectPublicKeyInfo' },
      { value: 255, name: '255 (PrivSel)', description: 'Private Use' }
    ],
    matching_types: [
      { value: 0, name: '0 (Full)', description: 'No hash used' },
      { value: 1, name: '1 (SHA2-256)', description: '256 bit hash by SHA2' },
      { value: 2, name: '2 (SHA2-512)', description: '512 bit hash by SHA2' },
      { value: 255, name: '255 (PrivMatch)', description: 'Private Use' }
    ],
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        records: []
      }
    },
    headers: [
      { text: 'Usage', value: 'usage', align: 'left' },
      { text: 'Selector', value: 'selector', align: 'left' },
      { text: 'Matching Type', value: 'matching_type', align: 'left' },
      { text: 'Certificate', value: 'certificate', align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      usage: 0,
      selector: 0,
      matching_type: 0,
      certificate: ''
    }
  })
}
</script>

<style scoped>

</style>

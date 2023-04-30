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
        :sort-by="'key_tag'"
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
                <v-text-field
                  v-model="slotProps.item.key_tag"
                  label="key tag"
                  :rules="[required(), onlyNumber(), min(0), max(65535)]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="algorithms"
                  item-text="description"
                  item-value="number"
                  v-model="slotProps.item.algorithm"
                  label="algorithm"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="digests"
                  item-text="description"
                  item-value="number"
                  v-model="slotProps.item.digest_type"
                  label="digest type"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="slotProps.item.digest"
                  label="digest"
                  :rules="[required()]"
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
import validation from '../inputs/validation'
import table from './table'
import RecordTable from './RecordTable'
export default {
  name: 'DS',
  components: { RecordTable, TTLSelect },
  mixins: [table, validation],
  data: () => ({
    algorithms: [
      { number: 3, description: '3 (DSA/SHA1)' },
      { number: 5, description: '5 (RSA/SHA-1)' },
      { number: 6, description: '6 (DSA-NSEC3-SHA1)' },
      { number: 7, description: '7 (RSASHA1-NSEC3-SHA1)' },
      { number: 8, description: '8 (RSA/SHA-256)' },
      { number: 10, description: '10 (RSA/SHA-512)' },
      { number: 12, description: '12 (GOST R 34.10-2001)' },
      { number: 13, description: '13 (ECDSA Curve P-256 with SHA-256)' },
      { number: 14, description: '14 (ECDSA Curve P-384 with SHA-384)' },
      { number: 15, description: '15 (Ed25519)' },
      { number: 16, description: '16 (Ed448)' },
      { number: 253, description: '253 (private algorithm)' },
      { number: 254, description: '254 (private algorithm OID)' }
    ],
    digests: [
      { number: 1, description: '1 (SHA-1)' },
      { number: 2, description: '2 (SHA-256)' },
      { number: 3, description: '3 (GOST R 34.11-94)' },
      { number: 4, description: '4 (SHA-384)' }
    ],
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        records: []
      }
    },
    headers: [
      { text: 'Key Tag', value: 'key_tag', align: 'left' },
      { text: 'Algorithm', value: 'algorithm', align: 'left' },
      { text: 'Digest Type', value: 'digest_type', align: 'left' },
      { text: 'Digest', value: 'digest', sortable: false, align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      key_tag: 0,
      algorithm: 5,
      digest_type: 1,
      digest: ''
    }
  })
}
</script>

<style scoped>

</style>

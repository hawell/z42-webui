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
        :sort_by="'key_tag'"
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
                  :value="slotProps.item.key_tag"
                  @input="slotProps.item.key_tag = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="key tag"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.algorithm"
                  @input="slotProps.item.algorithm = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="algorithm"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  :value="slotProps.item.digest_type"
                  @input="slotProps.item.digest_type = $event !== '' ? parseInt($event) : null"
                  type="number"
                  label="digest type"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="slotProps.item.digest"
                  label="digest"
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
  name: 'DS',
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
      { text: 'Key Tag', align: 'start', value: 'key_tag' },
      { text: 'Algorithm', value: 'algorithm' },
      { text: 'Digest Type', value: 'digest_type' },
      { text: 'Digest', value: 'digest', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    defaultItem: {
      key_tag: 0,
      algorithm: 0,
      digest_type: 0,
      digest: "",
    },
  }),
}
</script>

<style scoped>

</style>
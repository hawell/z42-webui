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
        :sort_by="'tag'"
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
              <v-select
                  :items="['issue', 'issuewild', 'iode']"
                  v-model="slotProps.item.tag"
                  label="tag"
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-select
                  :items="[0, 128]"
                  :value="slotProps.item.flag"
                  @input="slotProps.item.flag = $event !== '' ? parseInt($event) : 0"
                  label="flag"
              ></v-select>
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
              ></FQDN>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </RecordTable>
    </v-form>
  </div>
</template>

<script>
import table from "./table"
import TTLSelect from "../inputs/TTLSelect";
import RecordTable from "./RecordTable";
import FQDN from "../inputs/FQDN";
export default {
  name: 'CAA',
  components: {FQDN, RecordTable, TTLSelect},
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
      { text: 'Tag', align: 'start', value: 'tag' },
      { text: 'Value', value: 'value' },
      { text: 'Flag', value: 'flag' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    defaultItem: {
      tag: "",
      value: "",
      flag: 0,
    },
  }),
}
</script>

<style scoped>

</style>
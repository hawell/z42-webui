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
      <v-card>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Records</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn
            @click="record_set.value.records.push({host: ''})"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            New Item
          </v-btn>
        </v-toolbar>
        <v-divider />
        <v-row v-for="(item, key) in record_set.value.records" :key="key" class="ma-4" align="center" dense>
          <v-col cols="10">
            <FQDN
              v-model="item.host"
              :label="'host'"
            />
          </v-col>
          <v-col cols="2">
            <v-btn
              x-small
              @click="remove_item(key)"
            >
              <v-icon x-small>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import TTLSelect from '../inputs/TTLSelect'
import FQDN from '../inputs/FQDN'
import common from './common'
export default {
  name: 'NS',
  components: { FQDN, TTLSelect },
  mixins: [common],
  data: () => ({
    record_set: {
      enabled: true,
      value: {
        ttl: 300,
        records: []
      }
    }
  }),

  methods: {
    remove_item (index) {
      this.record_set.value.records.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>

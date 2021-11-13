<template>
  <v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn text @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <FQDN v-model="edited_item.id" label="zone" />
          <v-checkbox v-model="edited_item.enabled" label="enabled" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="zones"
      class="elevation-1"
      :options.sync="options"
      :server-items-length="total_locations"
      :loading="loading"
      :search="search"
      sort-by="id"
      @dblclick:row="row_dblclick"
    >
      <template #top>
        <v-toolbar>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            class="mx-4"
            @input="update"
          />
          <v-spacer />
          <v-btn
            @click="editItem(defaultItem)"
          >
            New Zone
          </v-btn>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #item.enabled="{ item }">
        <v-simple-checkbox
          v-model="item.enabled"
          :ripple="false"
          disabled
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import FQDN from '../inputs/FQDN'

export default {
  name: 'ZoneTable',
  components: { FQDN },
  emits: ['zone_added', 'zone_removed', 'zone_selected'],
  data: () => ({
    zones: [],
    headers: [
      { text: 'Zone', value: 'id', align: 'left' },
      { text: 'Enabled', value: 'enabled', sortable: false, align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      zone: '',
      enabled: true
    },
    search: '',
    options: {},
    total_locations: 0,
    loading: true,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    edited_item: {}
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New' : 'Edit'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    dialogDelete (val) {
      val || this.closeDelete()
    },
    options: {
      deep: true,
      handler () {
        this.update()
      }
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.zones.indexOf(item)
      this.edited_item = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.zones.indexOf(item)
      this.edited_item = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$z42api.delete_zone(this.edited_item.id)
        .then(() => {
          this.closeDelete()
          this.update()
          this.$emit('zone_removed', this.edited_item.id)
        })
        .catch((error) => {
          console.log(error)
          this.closeDelete()
          this.update()
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.edited_item = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.edited_item = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex === -1) {
        this.$z42api.add_zone({ name: this.edited_item.id, enabled: this.edited_item.enabled })
          .then(() => {
            this.close()
            this.update()
            this.$emit('zone_added', this.edited_item.id)
          })
          .catch((error) => {
            console.log(error)
            this.$toast.error('add zone failed', { icon: 'error' })
            this.close()
            this.update()
          })
      }
    },
    update () {
      const { page, itemsPerPage, sortDesc } = this.options
      let ascending = true
      if (sortDesc && sortDesc.length > 0 && sortDesc[0] === true) {
        ascending = false
      }
      this.loading = true
      this.$z42api.get_zones(this.search, (page - 1) * itemsPerPage, itemsPerPage, ascending)
        .then((resp) => {
          this.zones = resp.data.items ? resp.data.items : []
          this.total_locations = resp.data.total
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error('get locations failed', { icon: 'error' })
          this.loading = true
        })
    },
    row_dblclick (event, item) {
      this.$emit('zone_selected', item.item.id)
    }
  }
}
</script>

<style scoped>

</style>

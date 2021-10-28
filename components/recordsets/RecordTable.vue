<template>
  <div>
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
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <slot name="dialog" :item="edited_item" />
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
              :disabled="!valid"
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by="sortBy"
      class="elevation-1"
      style="width: 100vw"
    >
      <template #top>
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
            class="mb-2"
            @click="editItem(defaultItem)"
          >
            New Item
          </v-btn>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'RecordTable',
  props: {
    headers: { type: Array, default: null },
    items: { type: Array, default: null },
    sortBy: { type: String, default: '' },
    defaultItem: { type: Object, default: null }
  },
  emits: ['editItem', 'addItem', 'deleteItem'],
  data: () => ({
    valid: false,
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
    }

  },

  methods: {

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.edited_item = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.edited_item = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$emit('deleteItem', this.editedIndex)
      this.closeDelete()
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
      if (this.editedIndex > -1) {
        this.$emit('editItem', { index: this.editedIndex, value: this.edited_item })
      } else {
        this.$emit('addItem', this.edited_item)
      }
      this.close()
    }

  }
}
</script>

<style scoped>
</style>

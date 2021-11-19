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
          <v-form v-model="valid">
            <v-text-field v-model="edited_item.name" label="name" :disabled="editedIndex !== -1" :rules="[alphanumeric(), required()]" />
            <v-checkbox v-model="edited_item.enabled" label="enabled" />
            <v-select v-model="edited_item.scope" :items="['acme']" label="scope" :rules="[required()]" />
            <v-select v-model="edited_item.zone_name" :items="zones" label="zones" :disabled="editedIndex !== -1" :rules="[required()]" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            :disabled="loading"
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            :disabled="loading || !valid"
            :loading="loading"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="new_key_dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          API-KEY Created Successfully
        </v-card-title>

        <v-card-text>
          <v-row align="center">
            <v-col cols="12">
              New Api Key created and <b>it will be displayed only now</b>,
              Please store it somewhere safe because as soon as you close this dialog, we will not be able to retrieve or restore this generated token.
            </v-col>
            <v-col cols="1">
              <v-btn
                left
                icon
                @click="copy_to_clipboard"
              >
                <v-icon>
                  mdi-content-copy
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="11">
              <v-text-field
                ref="new_api_key_value"
                v-model="new_api_key"
                readonly
                @focus="$event.target.select()"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="new_key_dialog = false; new_api_key = ''"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="api_keys"
      class="elevation-1"
      :loading="loading"
      :search="search"
      sort-by="name"
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
            New API-KEY
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

import validation from '../inputs/validation'

export default {
  name: 'APIKeysTable',
  mixins: [validation],
  data: () => ({
    valid: false,
    api_keys: [],
    headers: [
      { text: 'Name', value: 'name', align: 'left' },
      { text: 'Zone', value: 'zone_name', align: 'left' },
      { text: 'Scope', value: 'scope', align: 'left' },
      { text: 'Enabled', value: 'enabled', sortable: false, align: 'left' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'left' }
    ],
    defaultItem: {
      name: '',
      zone_name: '',
      scope: '',
      enabled: true
    },
    zones: [],
    search: '',
    total_api_keys: 0,
    loading: false,
    dialog: false,
    dialogDelete: false,
    new_key_dialog: false,
    new_api_key: '',
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

  mounted () {
    this.loading = true
    this.update()
    this.$z42api.get_zones('', 0, 1000, true)
      .then((resp) => {
        const items = resp.data.items
        const thisRef = this
        if (items !== null) {
          items.forEach(function (item) {
            thisRef.zones.push(item.id)
          })
        }
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        this.$toast.error('get zones failed', { icon: 'error' })
        this.loading = false
      })
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.api_keys.indexOf(item)
      this.edited_item = Object.assign({}, item)
      console.log('starting edit', this.edited_item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.api_keys.indexOf(item)
      this.edited_item = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$z42api.delete_api_key(this.edited_item.name)
        .then(() => {
          this.closeDelete()
          this.update()
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('delete api key failed', { icon: 'error' })
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
      if (this.editedIndex > -1) {
        this.loading = true
        this.$z42api.update_api_key(this.edited_item.name, { scope: this.edited_item.scope, enabled: this.edited_item.enabled })
          .then(() => {
            this.loading = false
            this.close()
            this.update()
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
            this.$toast.error('update api key failed', { icon: 'error' })
            this.close()
            this.update()
          })
      } else {
        this.loading = true
        console.log(this.edited_item)
        this.$z42api.add_api_key({ name: this.edited_item.name, zone_name: this.edited_item.zone_name, scope: this.edited_item.scope, enabled: this.edited_item.enabled })
          .then((resp) => {
            this.loading = false
            this.close()
            this.new_api_key = resp.data.name + '.' + resp.data.key
            this.new_key_dialog = true
            this.update()
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
            this.$toast.error('add api key failed', { icon: 'error' })
            this.close()
            this.update()
          })
      }
    },
    update () {
      this.loading = true
      this.$z42api.get_api_keys()
        .then((resp) => {
          this.api_keys = resp.data ? resp.data : []
          this.total_api_keys = resp.data.length
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error('get locations failed', { icon: 'error' })
          this.loading = true
        })
    },
    copy_to_clipboard () {
      this.$refs.new_api_key_value.focus()
      document.execCommand('copy')
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-container>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
      <v-list-item-content>Export zone data into a BIND format</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-alert</v-icon></v-list-item-icon>
      <v-list-item-content>ANAME records will be converted to CNAME</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-alert</v-icon></v-list-item-icon>
      <v-list-item-content>DNSSEC data are not included</v-list-item-content>
    </v-list-item>
    <v-row align="center" justify="center" class="mt-4">
      <v-col>
        <v-btn
          @click.prevent="export_zone"
        >
          <v-icon left>
            mdi-file-export
          </v-icon>
          Export
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-divider class="ma-10" />
    </v-row>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
      <v-list-item-content>import zone data from a BIND zone file</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
      <v-list-item-content>$ORIGIN, $TTL, $GENERATE directives are supported, $ORIGIN should match with current zone name</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-alert</v-icon></v-list-item-icon>
      <v-list-item-content>$INCLUDE directive is not allowed</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-alert</v-icon></v-list-item-icon>
      <v-list-item-content>all existing data will be overwritten</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon><v-icon>mdi-alert</v-icon></v-list-item-icon>
      <v-list-item-content>SOA and apex NS records are ignored</v-list-item-content>
    </v-list-item>
    <v-row align="center" justify="center" class="mt-4">
      <v-col>
        <v-file-input
          v-model="file"
          label="Zone file"
          filled
          dense
          prepend-icon="mdi-web"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-btn
          @click.prevent="import_zone"
        >
          <v-icon left>
            mdi-file-import
          </v-icon>
          Import
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ImportExport',
  props: {
    zoneName: {
      type: String,
      default: ''
    }
  },
  emits: ['zone_imported'],
  data () {
    return {
      file: ''
    }
  },
  methods: {
    async export_zone () {
      const resp = await this.$z42api.export_zone(this.zoneName)
      console.log(resp)
      const blob = new Blob([resp], { type: 'text/plain' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = this.zoneName + '-export.zone'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    import_zone () {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$z42api.import_zone(this.zoneName, formData)
        .then(() => {
          this.$toast.success('import successful', { icon: 'check' })
          this.$emit('zone_imported')
        })
        .catch((err) => {
          console.log('import failed', err)
          this.$toast.error('import failed', { icon: 'error' })
        })
    }
  }
}
</script>

<style scoped>

</style>

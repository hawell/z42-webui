<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col align="left">
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
          <v-list-item-content>
            This is the DS (Delegation Signer) record of your zone. it should be placed in the parent zone along with the delegating NS record.
            please consult with your registrar for more information.
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="1">
        <label>DS</label>
      </v-col>
      <v-col>
        <v-text-field
          v-model="ds"
          readonly
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DNSSEC',
  props: {
    zoneName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    ds: ''
  }),
  mounted () {
    this.$z42api.get_zone(this.zoneName).then((resp) => {
      this.ds = resp.data.ds
    })
  }
}
</script>

<style scoped>

</style>

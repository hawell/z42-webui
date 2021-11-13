<template>
  <v-container>
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

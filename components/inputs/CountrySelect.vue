<template>
  <v-select
    multiple
    chips
    :items="countries"
    item-text="name"
    item-value="alpha2Code"
    label="Countries"
    :value="value"
    @input="action"
  />
</template>

<script>
import countries from '../../static/countries.json'
export default {
  name: 'CountrySelect',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      countries
    }
  },
  methods: {
    action (event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style scoped>

</style>

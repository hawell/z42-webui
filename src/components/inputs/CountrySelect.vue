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
  >
  </v-select>
</template>

<script>
import countries from "../../assets/countries.json";
export default {
  name: "CountrySelect",
  props: ['value'],
  data() {
    return {
      countries: countries,
    };
  },
  methods: {
    action: function(event) {
      this.$emit('input', event)
    },
  },
}
</script>

<style scoped>

</style>
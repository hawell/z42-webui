<template>
  <v-text-field
      :label="label"
      :value="value"
      @input="action"
      :rules="Ip6Rules"
  >

  </v-text-field>
</template>

<script>
import validation from "./validation";

export default {
  mixins: [validation],
  name: "Ip6Input",
  props: ['value', 'label'],
  methods: {
    action: function(event) {
      this.$emit('input', event)
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <v-text-field
    :label="label"
    :value="value"
    :rules="Ip6Rules"
    @input="action"
  />
</template>

<script>
import validation from './validation'

export default {
  name: 'Ip6Input',
  mixins: [validation],
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' }
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

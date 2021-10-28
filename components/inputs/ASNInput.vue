<template>
  <v-combobox
    :value="value"
    :label="label"
    multiple
    chips
    :rules="[numberArray]"
    @input="action"
  />
</template>

<script>
import validation from './validation'

export default {
  name: 'ASNInput',
  mixins: [validation],
  props: {
    value: { type: Array, default: () => [] },
    label: { type: String, default: '' }
  },
  data: () => ({
    selected: []
  }),
  mounted () {
    this.selected = this.value
  },
  methods: {
    action (event) {
      const nums = []
      for (let i = 0; i < event.length; i++) {
        const num = parseInt(event[i])
        if (isNaN(num)) {
          this.$emit('input', event)
        }
        nums.push(num)
      }
      this.$emit('input', nums)
    }
  }
}
</script>

<style scoped>

</style>

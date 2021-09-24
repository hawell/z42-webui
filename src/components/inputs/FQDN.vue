<template>
<v-text-field
    :label="label"
    :value="value"
    @input="action"
>

</v-text-field>
</template>

<script>
export default {
  name: "FQDN",
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
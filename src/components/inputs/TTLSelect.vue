<template>
<v-combobox
    :items="items"
    item-text="name"
    item-value="value"
    :label="label"
    :value="value"
    @input="action"
></v-combobox>
</template>

<script>

export default {
  name: "TTLSelect",
  props: ['value', 'label'],
  data() {
    return {
      items: [
        {name: "30 seconds", value: 30},
        {name: "1 minute", value: 60},
        {name: "2 minutes", value: 120},
        {name: "3 minutes", value: 180},
        {name: "5 minutes", value: 300},
        {name: "10 minutes", value: 600},
        {name: "30 minutes", value: 1800},
        {name: "1 hour", value: 3600},
        {name: "2 hours", value: 3600},
        {name: "3 hours", value: 10800},
        {name: "5 hours", value: 18000},
        {name: "10 hours", value: 36000},
        {name: "1 day", value: 86400},
        {name: "2 days", value: 172800},
        {name: "5 days", value: 432000},
        {name: "10 days", value: 864000},
        {name: "20 days", value: 1728000},
        {name: "1 month", value: 2592000},
      ],
    };
  },
  methods: {
    action: function(event) {
      if (typeof event === 'object') {
        this.$emit('input', event.value)
      } else {
        this.$emit('input', event)
      }
    },
  },
}
</script>

<style scoped>

</style>
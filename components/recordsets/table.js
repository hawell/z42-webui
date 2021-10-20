import common from './common'

export default {
  mixins: [common],
  methods: {
    addItem (item) {
      this.record_set.value.records.push(item)
      this.$emit('modified', this.record_type)
    },

    editItem (item) {
      Object.assign(this.record_set.value.records[item.index], item.value)
      this.$emit('modified', this.record_type)
    },

    deleteItem (itemIndex) {
      this.record_set.value.records.splice(itemIndex, 1)
      this.$emit('modified', this.record_type)
    }
  }
}

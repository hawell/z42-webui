import common from "./common";

export default {
    mixins: [common],
    methods: {
        addItem(item){
            this.record_set.value.records.push(item)
            this.$emit('modified', this.record_type)
        },

        editItem(item){
            Object.assign(this.record_set.value.records[item.index], item.value)
            this.$emit('modified', this.record_type)
        },

        deleteItem(item_index){
            this.record_set.value.records.splice(item_index, 1)
            this.$emit('modified', this.record_type)
        },
    },
}
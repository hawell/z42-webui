import common from "./common";

export default {
    mixins: [common],
    data: () => ({
        isLoading: false,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        defaultItem: null,
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New IP' : 'Edit IP'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        dialogDelete (val) {
            val || this.closeDelete()
        },

    },

    methods: {

        initialize () {
            if (this.empty) {
                return
            }
            this.isLoading = true
            this.getData().then(() => {
                this.isLoading = false
            }).catch(err => {
                console.log(err)
                this.isLoading = false
            })
        },

        editItem (item) {
            this.editedIndex = this.record_set.value.records.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.record_set.value.records.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.$emit('modified', this.record_type)
            this.record_set.value.records.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            this.$emit('modified', this.record_type)
            if (this.editedIndex > -1) {
                Object.assign(this.record_set.value.records[this.editedIndex], this.editedItem)
            } else {
                this.record_set.value.records.push(this.editedItem)
            }
            this.close()
        },

    },
}
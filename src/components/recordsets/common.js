import api from "../../api";

export default {
    props: [
        'zone_name',
        'location',
        'record_type',
        'empty',
        'refreshing',
        'updating',
    ],

    data: () => ({
        first: true,
    }),

    emits: ['refreshed', 'updated', 'modified'],

    watch: {
        refreshing(val) {
            if (val === true) {
                console.log('refreshing', this.record_type)
                this.getData()
                    .then(() => {
                        this.$emit('refreshed', this.record_type)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$emit('refreshed', this.record_type)
                    })
            }
        },

        updating(val) {
            if (val === true) {
                console.log('updating', this.record_type)
                this.updateData()
                    .then(() => {
                        this.$emit('updated', this.record_type)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$emit('updated', this.record_type)
                    })
            }
        },
        record_set: {
            deep: true,
            immediate: false,
            handler: function () {
                if (this.first) {
                    this.first = false
                    return
                }
                this.$emit('modified', this.record_type)
            }
        }
    },

    created () {
        this.initialize()
        console.log('created')
    },

    methods: {
        getData: function () {
            return api.get_record_set(this.zone_name, this.location, this.record_type).then(resp => {
                console.log(resp.data)
                this.record_set = resp.data.data
            })
        },

        updateData: function () {
            if (this.empty) {
                return api.add_record_set(this.zone_name, this.location, this.record_type, this.record_set)
            } else {
                return api.update_record_set(this.zone_name, this.location, this.record_type, this.record_set)
            }
        },

        initialize() {
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
    },
}
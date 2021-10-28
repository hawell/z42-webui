
export default {
  props: {
    zoneName: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    recordType: {
      type: String,
      default: ''
    },
    empty: {
      type: Boolean,
      default: true
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    updating: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    valid: false,
    first: true
  }),

  emits: ['refreshed', 'updated', 'modified', 'validation'],

  watch: {
    refreshing (val) {
      if (val === true) {
        this.getData()
          .then(() => {
            this.$emit('refreshed', this.recordType)
          })
          .catch((err) => {
            console.log(err)
            this.$emit('refreshed', this.recordType)
          })
      }
    },

    updating (val) {
      if (val === true) {
        this.updateData()
          .then(() => {
            this.$emit('updated', this.recordType)
          })
          .catch((err) => {
            console.log(err)
            this.$emit('updated', this.recordType)
          })
      }
    },

    valid (val) {
      this.$emit('validation', val)
    },

    record_set: {
      deep: true,
      immediate: false,
      handler () {
        if (this.first) {
          this.first = false
          return
        }
        this.$emit('modified', this.recordType)
      }
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    getData () {
      return this.$z42api.get_record_set(this.zoneName, this.location, this.recordType).then((resp) => {
        console.log(resp.data)
        this.record_set = resp.data
      })
    },

    updateData () {
      if (this.empty) {
        return this.$z42api.add_record_set(this.zoneName, this.location, this.recordType, this.record_set)
      } else {
        return this.$z42api.update_record_set(this.zoneName, this.location, this.recordType, this.record_set)
      }
    },

    initialize () {
      if (this.empty) {
        return
      }
      this.isLoading = true
      this.getData().then(() => {
        this.isLoading = false
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      })
    }
  }
}

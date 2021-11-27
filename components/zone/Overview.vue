<template>
  <v-container>
    <v-card class="mb-2">
      <v-card-title>Nameservers</v-card-title>
      <v-card-subtitle class="text-left">
        These are your dedicated nameservers.
        you must change the name servers that are associated with your domain registration to point to them.
        The process differs by domain registrar provider.
        Consult the documentation for your provider to determine how to make the name server change.
      </v-card-subtitle>
      <v-card-text>
        <v-row v-for="index in our_ns.keys()" :key="index" align="center" dense>
          <v-col cols="1">
            <v-btn
              left
              icon
              @click="copy_to_clipboard(index)"
            >
              <v-icon>
                mdi-content-copy
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <v-text-field ref="ns" v-model="our_ns[index]" readonly />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-2">
      <v-card-title>Status</v-card-title>
      <v-card-subtitle class="text-left">
        <div v-if="detected_ns.length === 0">
          We couldn't detect your current ns values. please check with your registrar and
          make sure you have correctly set ns values. note that it may take up to 24 hours for
          recursors to fetch new records.
        </div>
        <div v-else-if="arrays_equal(our_ns, detected_ns)">
          Your nameservers are valid and match with the above values.
        </div>
        <div v-else>
          We have detected the following values as your current nameservers. please change these values
          to those above in order to use our service. note that it may take up to 24 hours for
          recursors to update new values.
        </div>
        <v-row v-for="index in detected_ns.keys()" :key="index" align="center" dense>
          <v-col cols="11">
            <v-text-field ref="ns" v-model="detected_ns[index]" readonly disabled />
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="get_active_ns" elevation="4" class="ma-4" :loading="loading">
          <v-icon left>
            mdi-reload
          </v-icon>
          Reload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    zoneName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    our_ns: [],
    detected_ns: [],
    loading: false
  }),
  mounted () {
    this.$z42api.get_record_set(this.zoneName, '@', 'ns')
      .then((resp) => {
        const thisRef = this
        resp.data.value.records.forEach((record) => {
          thisRef.our_ns.push(record.host)
        })
        this.our_ns.sort()
      })
      .then(() => {
        this.get_active_ns()
      })
      .catch((err) => {
        console.log(err)
        this.$toast.error('loading ns failed', { icon: 'error' })
      })
  },
  methods: {
    copy_to_clipboard (index) {
      this.$refs.ns[index].focus()
      document.execCommand('copy')
    },
    get_active_ns () {
      this.loading = true
      this.$z42api.active_ns(this.zoneName)
        .then((resp) => {
          console.log(resp)
          this.detected_ns = []
          if (resp.data.rcode === 0) {
            const thisRef = this
            resp.data.hosts.forEach((host) => {
              thisRef.detected_ns.push(host)
            })
            this.detected_ns.sort()
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.detected_ns = []
          this.loading = false
        })
    },
    arrays_equal(a, b) {
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>

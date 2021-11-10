<template>
  <v-app>
    <v-main>
      <v-container fluid class="full-height">
        <div>
          <v-row
            align="center"
            justify="center"
            class="vmid mt-16 mb-4"
          >
            <v-col
              cols="12"
              sm="1"
              md="1"
            >
              <Logo />
              Zone - 42
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="vmid"
          >
            <v-col
              cols="12"
              sm="3"
              md="3"
            >
              <Nuxt />
            </v-col>
          </v-row>
          <div align="center">
            Protected by reCAPTCHA
          </div>
        </div>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Logo from '../components/Logo'
import Footer from '../components/Footer'
export default {
  name: 'Auth',
  components: { Footer, Logo },
  async mounted () {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.vmid {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Axios from 'axios'
import { VueReCaptcha } from "vue-recaptcha-v3";

Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY, loaderOptions: {autoHideBadge: true} })
Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

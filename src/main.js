import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/css/reset.css'
import './common/css/index.css'
import axios from 'axios'
import moment from 'moment'
import vueiInfinite from 'vue-infinite-scroll'

Vue.use(vueiInfinite)
moment.locale('zh-cn')
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

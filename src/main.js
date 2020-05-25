import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/css/reset.css'
import './common/css/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script'

Vue.config.productionTip = false

// Set the base URL of the API
//ApiService.init(process.env.VUE_APP_API_BASE_URL)

//AuthService.validate()
// If token exists set header
/*if (TokenService.getToken()) {
  ApiService.setHeader()
}*/

Vue.use(LoadScript);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

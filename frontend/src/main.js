import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script';

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(LoadScript);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

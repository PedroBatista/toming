import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth
  },
  strict: false
})

export default store

// Initialize the auth store.
// TODO
store.dispatch("auth/validate")

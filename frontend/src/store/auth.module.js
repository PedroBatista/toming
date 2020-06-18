import {AuthenticationError, AuthService} from '../services/auth.service'
import router from '../router'

const state = {
  validating: true,
  authenticating: false,
  userDetails: undefined,
  authenticationErrorCode: 0,
  authenticationError: ''
}

const getters = {
  validating: (state) => {
    return state.validating
  },
  authenticating: (state) => {
    return state.authenticating
  },
  userDetails: (state) => {
    return state.userDetails
  },
  loggedIn: (state) => {
    return state.userDetails ? true : false
  },
  authenticationErrorCode: (state) => {
    return state.authenticationErrorCode
  },
  authenticationError: (state) => {
    return state.authenticationError
  }
}

const actions = {
  async login({commit}, {email, password}) {
    commit('loginRequest');

    try {
      const response = await AuthService.login(email, password);
      commit('loginSuccess', {userDetails: response.user}) // TODO

      this._vm.$bvToast.toast("Logged in successfully.", {
        variant: "success",
        title: 'SUCCESS',
        autoHideDelay: 5000
      })

      // Redirect the user to the page he first tried to visit or to the home view
      router.push(router.history.current.query.redirect || '/')

      return true
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
      }

      this._vm.$bvToast.toast(e.message, {
        variant: "danger",
        title: 'ERROR',
        autoHideDelay: 5000
      })

      return false
    }
  },
  async register({commit}, {name, email, password}) {
    try {
      const response = await AuthService.register(name, email, password)
      router.push("/login")

      return true
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
      }
      return false
    }
  },
  logout({commit}) {
    AuthService.logout()
    commit('logoutSuccess')
    router.push('/login')
  },
  async validate({commit}) {
    let status = false;
    try {
      const response = await AuthService.validate()
      commit('validateSuccess', {userDetails: response.user})

      status = true
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('validateError', {errorCode: e.errorCode, errorMessage: e.message})
      }
    }

    // Redirect the user to the page he first tried to visit or to the home view
    if (router.history.current.query.redirect)
      router.push(router.history.current.query.redirect)

    return status
  }
}

const mutations = {
  loginRequest(state) {
    state.authenticating = true
    state.authenticationErrorCode = 0
    state.authenticationError = ''
  },
  loginSuccess(state, {userDetails}) {
    state.userDetails = userDetails
    state.authenticating = false;
  },
  loginError(state, {errorCode, errorMessage}) {
    state.authenticating = false
    state.userDetails = undefined
    state.authenticationErrorCode = errorCode
    state.authenticationError = errorMessage
  },
  logoutSuccess(state) {
    state.userDetails = undefined
  },
  validateSuccess(state, {userDetails}) {
    state.validating = false
    state.userDetails = userDetails
    state.authenticating = false
  },
  validateError(state, {errorCode, errorMessage}) {
    state.validating = false
    state.userDetails = undefined
    state.authenticationErrorCode = errorCode
    state.authenticationError = errorMessage
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

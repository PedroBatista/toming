import axios from 'axios'
import store from '../store'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

const ApiService = {
  /*init(baseURL) {
    axios.defaults.baseURL = baseURL
  },*/

  get(resource) {
    return axios.get(resource)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  },

  // Stores the 401 interceptor position so that it can be later ejected when needed
  _401interceptor: null,

  // TODO
  mount401Interceptor() {
    if (this._401interceptor != null)
      return;

    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.request.status == 401 && error.config.url.includes('/auth/login')) {
          // Logout the user
          await store.dispatch('auth/logout')
          return
        }
        throw error
      }
    )
  },

  unmount401Interceptor() {
    if (this._401interceptor == null)
      return;

    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
    this._401interceptor = null
  }

}

export default ApiService

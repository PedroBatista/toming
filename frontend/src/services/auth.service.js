import ApiService from './api.service'

class ApplicationError extends Error {
  constructor(errorCode, message) {
    super()
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

class AuthenticationError extends ApplicationError {
  constructor(errorCode, message) {
    super(errorCode, message)
  }
}

const AuthService = {
  login: async function (email, password) {
    try {
      const response = await ApiService.post(
        "/auth/login",
        {
          email,
          password
        }
      )

      ApiService.mount401Interceptor()

      return response.data
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.message)
    }
  },
  register: async function (name, email, password) {
    try {
      const response = await ApiService.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      )

      return response.data
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.message)
    }
  },
  logout: async function () {
    try {
      const response = await ApiService.get("/auth/logout")

      ApiService.unmount401Interceptor()

      return response.data
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.message)
    }
  },
  validate: async function () {
    // TODO validate authentication

    try {
      const response = await ApiService.get("/auth/session")

      ApiService.mount401Interceptor()

      return response.data
    } catch (error) {
      ApiService.unmount401Interceptor()
      throw new AuthenticationError(error.response.status, error.response.data.message)
    }
  }
}

export {AuthService, AuthenticationError}

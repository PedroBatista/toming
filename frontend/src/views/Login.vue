<template>
  <div>
    <h1>Login</h1>

    <b-container>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-email"
          label="Email address:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label="Password:"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          />
        </b-form-group>

        <p v-if="authenticationError">
          {{ authenticationError }}
        </p>

        <b-button
          type="submit"
          variant="primary"
          :disabled="authenticating"
        >
          <b-spinner
            small
            v-if="authenticating"
          />
          Submit
        </b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "Login",
    data: () => ({
      email: null,
      password: null
    }),
    computed: {
      ...mapGetters('auth', [
        'authenticating',
        'authenticationError',
        'authenticationErrorCode'
      ])
    },
    methods: {
      ...mapActions('auth', [
        'login'
      ]),
      onSubmit(event) {
        event.preventDefault()
        // Perform a simple validation that email and password have been typed in
        //if (this.usernameOrEmail !== '' && this.password !== '') {
          this.login({email: this.email, password: this.password})
          this.password = ""
        //}
      }
    }
  }
</script>

<style scoped>

</style>

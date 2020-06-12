<template>
  <div>
    <h1>Login</h1>

    <b-container>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-email"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-email"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label="Password:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>

  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "Login",
    data: () => ({
      email: null,
      password: null
    }),
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

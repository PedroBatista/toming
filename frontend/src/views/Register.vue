<template>
  <div>
    <h1 class="text-center">
      Register
    </h1>

    <b-container>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-name"
          label="Name:"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            v-model="name"
            type="text"
            required
            placeholder="Enter your name"
          />
        </b-form-group>

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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          :disabled="authenticating"
        >
          <b-spinner
            v-if="authenticating"
            small
          />
          Register
        </b-button>

        <b-button
          variant="primary"
          class="float-right"
          @click="sendToLogin"
        >
          Login
        </b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "Register",
    data: () => ({
      name: null,
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
        'register'
      ]),
      async onSubmit() {
        await this.register({name: this.name, email: this.email, password: this.password})
        this.password = ""
      },
      sendToLogin() {
        if (this.$router.history.current.query.redirect)
          this.$router.push({
            name: "login",
            query: {redirect: this.$router.history.current.query.redirect}
          })
        else
          this.$router.push({
            name: "login"
          })
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <h1 class="text-center">Login</h1>

    <b-container>
      <b-form @submit.prevent="onSubmit">
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

        <b-button
          type="submit"
          variant="primary"
          :disabled="authenticating"
        >
          <b-spinner
            v-if="authenticating"
            small
          />
          Login
        </b-button>

        <b-button
          variant="primary"
          class="float-right"
          @click="sendToRegister"
        >
          Register
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
      async onSubmit() {
        await this.login({email: this.email, password: this.password})
        this.password = ""
      },
      sendToRegister() {
        if (this.$router.history.current.query.redirect)
          this.$router.push({
            name: "register",
            query: {redirect: this.$router.history.current.query.redirect}
          })
        else
          this.$router.push({
            name: "register"
          })
      }
    }
  }
</script>

<style scoped>

</style>

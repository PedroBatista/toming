<template>
  <div>
    <h1>Registo</h1>

    <b-container>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-name"
          label="Nome:"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            v-model="name"
            type="name"
            required
            placeholder="Enter name"
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
          Registar
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
        await this.register({name: this.name, email: this.email, password: this.password})
        this.password = ""
      }
    }
  }
</script>

<style scoped>

</style>

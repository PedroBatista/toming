<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="info"
  >
    <b-navbar-brand href="#">
      <img
        src="../../assets/toming.jpeg"
        class="d-inline-block align-top"
        style="height: 50px; width: 50px;"
        alt="Toming Logo"
      >
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item to="/">
          Home
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-if="userDetails">
          {{ userDetails.name }}
        </b-nav-text>
        <b-nav-item
          v-if="loggedIn"
          @click="logout"
        >
          Logout
          <b-icon-box-arrow-right />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Navbar",
    computed: {
      ...mapGetters('auth', [
        'loggedIn',
        'userDetails'
      ])
    },
    methods: {
      logout() {
        // TODO
      }
    }
  }
</script>

<style scoped>

</style>

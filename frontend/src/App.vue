<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
  import JitsiExternalApi from "./components/JitsiExternalApi";
  import Navbar from "./components/layout/Navbar";

  export default {
    name: 'App',
    components: {
      Navbar,
      JitsiExternalApi
    },
    created() {
      // Initialize the auth store.
      this.$store.dispatch("auth/validate")
    }
  }
</script>

<style>
  body {
    height: 100vh;
  }

  #app {
    height: 100%;
  }
</style>

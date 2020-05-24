<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view />

    <b-button
      variant="success"
      @click="start"
    >
      Start
    </b-button>

    <JitsiExternalApi
      style="width: 1280px; height: 720px;"
      :options="options"
      ref="jitsi"
    />
  </div>
</template>

<script>
  import JitsiExternalApi from "./components/JitsiExternalApi";

  export default {
    name: 'App',
    components: {
      JitsiExternalApi
    },
    data: () => ({
      options: {
        "roomName": "TestDemo1234567890"
      }
    }),
    methods: {
      start () {
        this.$refs.jitsi.start()
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

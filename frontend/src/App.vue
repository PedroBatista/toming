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

    <!--<b-button
      variant="success"
      @click="start"
    >
      Start
    </b-button>-->

    <!--<JitsiExternalApi
      style="width: 1280px; height: 720px;"
      room-display-name="Test Room Subject"
      :options="options"
      ref="jitsi"
    />-->
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
      /*options: {
        "roomName": "TestDemo1234567890",
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9jdXRlY2F0c2hxLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wNS9Penp5LURhdGluZy1Qcm9maWxlLVBob3RvLi1IZWxsby1MYWRpZXMuanBnIiwibmFtZSI6IkRhbmllbCBNYXJtZWxvIn19LCJhdWQiOiJ0b21pbmctdXNlcnMiLCJpc3MiOiJ0b21pbmciLCJzdWIiOiJqaXRzaS5jaW1hYS5wdCIsInJvb20iOiJUZXN0RGVtbzEyMzQ1Njc4OTAiLCJpYXQiOjE1OTE0MDE4MjcsImV4cCI6MTU5MTQwMjcyN30.zw1yJuIZ24WJHQA0AXvpKqBPzTuI_spKQb7nvbcqWSc"
      }*/
    }),
    methods: {
      /*start () {
        this.$refs.jitsi.start()
      }*/
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

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button id="start" type="button" @click="start">Start</button>
    <JitsiExternalApi style="width: 1280px; height: 720px;" :options="options" ref="jitsi" />
  </div>
</template>

<script>
  import JitsiExternalApi from "./components/JitsiExternalApi";

  // registo, login, listar salas, sala, etc.

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
    margin-top: 60px;
  }
</style>

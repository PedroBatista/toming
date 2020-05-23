<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button id="start" type="button" @click="start">Start</button>
    <JitsiExternalApi :options="options" ref="jitsi" />
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
        "roomName": "TestDemo1234567890",
        "width": 1280,
        "height": 720,
      }
    }),
    methods: {
      start: function () {
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

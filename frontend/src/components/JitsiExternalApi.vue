<template>
  <div id="jitsi-container"></div>
</template>

<script>
  export default {
    name: "JitsiExternalApi",
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    data: () => ({}),
    mounted() {
      let jitsiExternalApi = document.createElement('script')
      jitsiExternalApi.setAttribute('src', 'https://jitsi.cimaa.pt/external_api.js')
      document.head.appendChild(jitsiExternalApi)
    },
    methods: {
      start: function () {
        let container = document.querySelector('#jitsi-container')
        let domain = "jitsi.cimaa.pt"
        let options = {
          ...this.options,
          "parentNode": container,
        }

        // eslint-disable-next-line no-undef
        let api = new JitsiMeetExternalAPI(domain, options)
      }
    }
  }
</script>

<style scoped>

</style>

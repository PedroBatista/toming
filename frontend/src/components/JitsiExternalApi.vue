<template>
  <div id="jitsi-container" />
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
    data: () => ({
      scriptLoaded: false,
      started: false
    }),
    mounted() {
      // https://stackoverflow.com/questions/45047126/how-to-add-external-js-scripts-to-vuejs-components
      this.$loadScript("https://jitsi.cimaa.pt/external_api.js")
        .then(() => {
          this.scriptLoaded = true
        })
        .catch(() => {
          // Failed to fetch script
        });
      /*let jitsiExternalApi = document.createElement('script')
      jitsiExternalApi.setAttribute('src', 'https://jitsi.cimaa.pt/external_api.js')
      document.head.appendChild(jitsiExternalApi)*/
    },
    beforeDestroy() {
      this.$unloadScript("https://jitsi.cimaa.pt/external_api.js")
    },
    methods: {
      // https://stackoverflow.com/questions/40957008/how-to-access-to-a-child-method-from-the-parent-in-vue-js/40957171

      start () {
        if (this.scriptLoaded === false || this.started === true)
          return

        let container = document.querySelector('#jitsi-container')
        let domain = "jitsi.cimaa.pt"
        let options = {
          ...this.options,
          "parentNode": container,
          "width": "100%",
          "height": "100%"
        }

        // eslint-disable-next-line no-undef
        let api = new JitsiMeetExternalAPI(domain, options)

        this.started = true
      }
    }
  }
</script>

<style scoped>

</style>

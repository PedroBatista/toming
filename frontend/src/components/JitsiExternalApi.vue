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
    data: () => ({}),
    mounted() {
      let jitsiExternalApi = document.createElement('script')
      jitsiExternalApi.setAttribute('src', 'https://jitsi.cimaa.pt/external_api.js')
      document.head.appendChild(jitsiExternalApi)
    },
    methods: {
      // https://stackoverflow.com/questions/40957008/how-to-access-to-a-child-method-from-the-parent-in-vue-js/40957171

      start () {
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
      }
    }
  }
</script>

<style scoped>

</style>

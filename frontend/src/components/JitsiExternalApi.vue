<template>
  <div id="jitsi-container" />
</template>

<script>
  export default {
    name: "JitsiExternalApi",
    props: {
      roomDisplayName: String,
      options: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      scriptLoaded: false,
      onCall: false,
      api: undefined
    }),
    mounted() {
      // https://stackoverflow.com/questions/45047126/how-to-add-external-js-scripts-to-vuejs-components
      // The script is only mounted if not already present.
      this.$loadScript(process.env.VUE_APP_JITSI_EXTERNAL_API)
        .then(() => {
          this.scriptLoaded = true
          this.start()
        })
        .catch(() => {
          // Failed to fetch script
        });
      /*let jitsiExternalApi = document.createElement('script')
      jitsiExternalApi.setAttribute('src', 'https://jitsi.cimaa.pt/external_api.js')
      document.head.appendChild(jitsiExternalApi)*/
    },
    beforeDestroy() {
      if (this.api != undefined)
        this.api.dispose()
      //this.$unloadScript(process.env.VUE_APP_JITSI_EXTERNAL_API)
    },
    methods: {
      // https://stackoverflow.com/questions/40957008/how-to-access-to-a-child-method-from-the-parent-in-vue-js/40957171
      start() {
        if (this.scriptLoaded === false || this.onCall === true)
          return

        let container = document.querySelector('#jitsi-container')
        let domain = process.env.VUE_APP_JITSI_SERVER_DOMAIN
        let options = {
          ...this.options,
          "parentNode": container,
          "width": "100%",
          "height": "100%",
          configOverwrite: {
            disableInviteFunctions: true
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
              'e2ee', 'security'
            ],
          }
        }

        // eslint-disable-next-line no-undef
        this.api = new JitsiMeetExternalAPI(domain, options)

        if (this.roomDisplayName != undefined)
          this.api.executeCommand('subject', this.roomDisplayName);

        this.api.on('readyToClose', () => {
          this.api.dispose()
          this.onCall = false
          this.$router.push('/')
        })

        this.onCall = true
      },
      executeCommand(...params) {
        if (this.scriptLoaded === false || this.onCall === true)
          return

        this.api.executeCommand(...params);
      }
    }
  }
</script>

<style scoped>

</style>

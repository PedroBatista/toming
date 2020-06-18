<template>
  <div id="room">
    <!-- TODO URGENT! CSS fill body height. -->
    <JitsiExternalApi
      v-if="room"
      style="height: 720px;"
      :room-display-name="room.subject"
      :options="jistiOptions"
      ref="jitsi"
    />
  </div>
</template>

<script>
  import JitsiExternalApi from "../components/JitsiExternalApi";
  import ApiService from "../services/api.service";

  export default {
    name: "Room",
    props: {
      id: {
        type: String,
        required: true
      }
    },
    components: {
      JitsiExternalApi
    },
    data: () => ({
      room: undefined,
      jistiOptions: undefined
    }),
    async created() {
      const response = await ApiService.get("/rooms/" + this.id)
      this.room = response.data

      this.jistiOptions = {
        roomName: this.room._id,
        jwt: this.room.jwt_token
      }
    },
    beforeRouteUpdate(to, from, next) {
      // react to route changes...
      // don't forget to call next()
      console.log("route changed")
      next()
    },
    methods: {}
  }
</script>

<style scoped>
  #room {

  }
</style>

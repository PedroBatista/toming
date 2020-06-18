<template>
  <b-container id="home">
    <h1>Home</h1>
    <b-input-group>
      <template v-slot:prepend>
        <b-input-group-text>Subject</b-input-group-text>
      </template>
      <b-form-input
        v-model="inputRoomName"
        @keyup.enter="createRoom"
      />

      <template v-slot:append>
        <b-button
          variant="info"
          @click="createRoom"
        >
          Create
        </b-button>
      </template>
    </b-input-group>

    <b-list-group>
      <b-list-group-item
        v-for="r in rooms"
        :key="r._id"
        :to="{ name: 'room', params: { id: r._id }}"
      >
        {{ r.subject }}
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
  import ApiService from "../services/api.service";

  export default {
    name: 'Home',
    data: () => ({
      inputRoomName: "",
      rooms: []
    }),
    async created() {
      const response = await ApiService.get("/rooms")
      this.rooms = response.data
    },
    methods: {
      async createRoom() {
        try {
          const response = await ApiService.post("/rooms/create", {
            subject: this.inputRoomName
          })

          this.inputRoomName = ""

          this.rooms.push(response.data)

          this.$bvToast.toast("Room created successfully!", {
            variant: "success",
            title: 'SUCCESS',
            autoHideDelay: 5000
          })

          return response.data
        } catch (error) {
          this.$bvToast.toast(error.response.data.message, {
            variant: "danger",
            title: 'ERROR',
            autoHideDelay: 5000
          })
        }
      }
    }
  }
</script>

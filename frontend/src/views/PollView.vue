<template>
  <div>
    <b-container>
      <Poll
        v-if="poll"
        :question="poll.question"
        :options="poll.options"
        :final-results="poll.already_voted"
        @vote-submit="voteSubmit"
      />
    </b-container>
  </div>
</template>

<script>
  import Poll from "../components/Poll";
  import ApiService from "../services/api.service";

  export default {
    name: "PollView",
    props: {
      id: {
        type: String,
        required: true
      }
    },
    components: {
      Poll
    },
    data() {
      return {
        poll: undefined,
        eventSource: undefined
      };
    },
    async created() {
      const response = await ApiService.get("/polls/" + this.id)
      this.poll = response.data

      this.setupStream()
    },
    beforeDestroy() {
      this.eventSource.close()
    },
    methods: {
      setupStream() {
        // Not a real URL, just using for demo purposes
        this.eventSource = new EventSource('/api/polls/' + this.id + '/events')

        this.eventSource.addEventListener('poll-update', event => {
          let data = JSON.parse(event.data)
          this.poll = Object.assign({}, this.poll, data)
        })
      },
      async voteSubmit(opt) {
        try {
          const response = await ApiService.get('polls/' + this.id + '/vote/' + opt._id)

          this.$bvToast.toast("You have successfully voted!", {
            variant: "success",
            title: "SUCCESS",
            autoHideDelay: 5000
          });

          this.poll = response.data
        } catch (error) {
          console.log(error)
          this.$bvToast.toast(error.response.data.message, {
            variant: "danger",
            title: "ERROR",
            autoHideDelay: 5000
          });
        }
      }
    }
  };
</script>

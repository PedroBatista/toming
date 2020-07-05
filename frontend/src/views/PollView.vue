<template>
  <div>
    <Poll :options="options" @addvote="addVote" />
 
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
        poll: {},

      options: {
        question: "",
        answers: []
      }
    };
  },
      async created() {
      const response = await ApiService.get("/polls/" + this.id)

      this.poll = response.data
      this.options.question = this.poll.question
      this.options.answers = this.poll.options
  
    },
  methods: {
    addVote(obj) {
      console.log("You voted " + obj.value + "!");
    }
  }
};
</script>
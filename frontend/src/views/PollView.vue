<template>
  <div>
    <Poll :pollSelected="pollSelected" @addvote="addVote" />
  </div>
</template>

<script>
import Poll from "../components/Poll";
import ApiService from "../services/api.service";
export default {
  name: "PollView",

  components: {
    Poll
  },
  data() {
    return {
      pollSelected: JSON.parse(localStorage.getItem('pollSelected'))
    };
  },
  methods: {
    addVote(obj) {
      console.log("You voted " + obj.value + "!");
    }
  }
};
</script>
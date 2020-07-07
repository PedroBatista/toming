<template>
  <div>
    <h1 class="text-center">
      Polls
    </h1>

    <b-container>
      <b-row>
        <b-col>
          <PollCreate
            class="float-right"
            @poll-created="pollCreated"
          />
        </b-col>
      </b-row>

      <b-list-group>
        <b-list-group-item
          v-for="r in polls"
          :key="r._id"
          :to="{ name: 'poll', params: { id: r._id }}"
        >
          {{ r.question }}
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
  import ApiService from "../services/api.service";
  import PollCreate from "../components/PollCreate";

  export default {
    name: "Polls",
    components: {
      PollCreate
    },
    data: () => ({
      polls: []
    }),
    async created() {
      const response = await ApiService.get("/polls");
      this.polls = response.data;
    },
    methods: {
      pollCreated(pool) {
        console.log(pool)
        this.polls.push(pool)
      }
    }
  };
</script>


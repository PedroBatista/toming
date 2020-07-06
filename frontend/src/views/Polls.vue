<template>
  <div>
    <h1 class="text-center">
      Polls
    </h1>

    <b-container>
      <b-form @submit.prevent="createPoll">
        <b-form-group
          id="input-group-question"
          label="Question:"
          label-for="input-question"
        >
          <b-form-input
            id="input-question"
            v-model="inputPollQuestion"
            type="text"
            required
            placeholder="Enter question"
          />
        </b-form-group>
        <b-list-group>
          <b-list-group-item
            v-for="(r,index) in options"
            :key="index"
          >
            {{ r }}
          </b-list-group-item>
        </b-list-group>
        <b-form-group
          id="input-group-answer"
          label="answers:"
          label-for="input-answer"
        >
          <b-input-group>
            <b-form-input
              @keydown.enter="createAnswer()"
              id="input-answer1"
              v-model="option"
              type="text"
              placeholder="Enter answer"
            />
            <template v-slot:append>
              <b-button
                variant="info"
                @click="createAnswer()"
              >
                Create Answer
              </b-button>
            </template>
          </b-input-group>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
        >
          Create
        </b-button>
      </b-form>

      <b-list-group>
        <b-list-group-item
          v-for="r in polls"
          :key="r"
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

  export default {
    name: "Polls",
    data: () => ({
      inputPollQuestion: "",
      option: "",
      options: [],
      polls: []
    }),

    async created() {
      const response = await ApiService.get("/polls");
      this.polls = response.data;
    },
    methods: {
      createAnswer() {
        this.options.push(this.option);
        this.option = "";

      },

      async createPoll() {
        try {

          const opts = this.options.map(o => {
            return {option: o};
          });
          const response = await ApiService.post("/polls/create", {
            question: this.inputPollQuestion,
            options: opts
          });

          this.inputPollQuestion = "";
          this.options = [];
          this.polls.push(response.data)

          this.$bvToast.toast("Poll created successfully!", {
            variant: "success",
            title: "SUCCESS",
            autoHideDelay: 5000
          });

          return response.data;
        } catch (error) {
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


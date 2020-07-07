<template>
  <div>
    <b-button
      v-b-modal.pool-create-modal
      variant="success"
    >
      Create Pool
      <b-icon-plus />
    </b-button>

    <b-modal
      id="pool-create-modal"
      title="Pool Creation"
      size="xl"
      scrollable
      header-bg-variant="info"
    >
      <b-container fluid>
        <b-form>
          <b-form-group
            id="input-group-question"
            label="Question:"
            label-for="input-question"
          >
            <b-form-input
              id="input-question"
              v-model="question"
              type="text"
              required
              placeholder="Enter the question..."
            />
          </b-form-group>

          <b-form-group
            id="input-group-options"
            label="Options:"
            label-for="input-option"
          >
            <b-list-group>
              <b-list-group-item
                v-for="(opt, index) in options"
                :key="index"
              >
                {{ opt.text }}
                <b-btn-close @click="remOption(index)" />
              </b-list-group-item>
            </b-list-group>

            <b-input-group>
              <b-form-input
                @keydown.enter="addOption"
                id="input-answer1"
                v-model="optionInput"
                type="text"
                placeholder="Enter an option..."
              />
              <template v-slot:append>
                <b-button
                  variant="success"
                  @click="addOption"
                >
                  Add Option
                </b-button>
              </template>
            </b-input-group>
          </b-form-group>
        </b-form>
      </b-container>

      <template v-slot:modal-footer>
        <b-button
          variant="success"
          class="float-right"
          block
          @click="createPool"
        >
          Create
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import ApiService from "../services/api.service";

  export default {
    name: "PoolCreate",
    data: () => ({
      question: undefined,
      options: [],
      optionInput: undefined
    }),
    methods: {
      clearModalInputs() {
        this.question = undefined
        this.options = []
        this.optionInput = undefined
      },
      addOption() {
        const trim = this.optionInput !== undefined ? this.optionInput.trim() : "";
        if (trim.length > 0) {
          this.options.push({
            text: trim
          })

          this.optionInput = undefined;
        }
      },
      remOption(index) {
        this.options.splice(index, 1)
      },

      async createPool() {
        try {
          const response = await ApiService.post("/polls/create", {
            question: this.question,
            options: this.options
          });

          this.$bvToast.toast("Poll created successfully!", {
            variant: "success",
            title: "SUCCESS",
            autoHideDelay: 5000
          });

          this.clearModalInputs()
          this.$emit("poll-created", response.data)
          this.$bvModal.hide("pool-create-modal")

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
  }
</script>

<style scoped>

</style>

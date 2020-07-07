<template>
  <div class="vue-poll">
    <h3 class="qst">
      {{ question }}
    </h3>
    <div class="ans-cnt">
      <div
        class="ans"
        v-for="(opt,index) in calcOptions"
        :key="index"
      >
        <template v-if="!finalResults">
          <div
            class="ans-no-vote noselect"
            @click.prevent="handleVote(opt)"
          >
            <span class="txt">
              {{ opt.text }}
            </span>
          </div>
        </template>
        <template v-else>
          <div class="ans-voted final">
            <span
              v-if="opt.percent"
              class="percent"
            >
              {{ opt.percent }}
            </span>
            <span class="txt">
              {{ opt.text }}
            </span>
          </div>
          <span
            :class="{ bg: true, selected: mostVotes === opt.vote_count }"
            :style="{ width: opt.percent }"
          />
        </template>
      </div>
    </div>
    <div
      class="votes"
      v-if="finalResults"
    >
      {{ totalVotesFormatted + ' votes' }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Poll',
    props: {
      question: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      finalResults: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      totalVotes() {
        let totalVotes = 0
        this.options.filter(opt => {
          if (!isNaN(opt.vote_count) && opt.vote_count > 0)
            totalVotes += parseInt(opt.vote_count)
        })
        return totalVotes
      },
      totalVotesFormatted() {
        return this.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      mostVotes() {
        let max = 0
        this.options.filter(opt => {
          if (!isNaN(opt.vote_count) && opt.vote_count > 0 && opt.vote_count >= max)
            max = opt.vote_count
        })

        return max
      },
      calcOptions() {
        if (this.totalVotes === 0)
          return this.options.map(opt => {
            opt.percent = '0%'
            return opt
          })

        //Calculate percent
        return this.options.filter(opt => {
          if (!isNaN(opt.vote_count) && opt.vote_count > 0)
            opt.percent = (Math.round((parseInt(opt.vote_count) / this.totalVotes) * 100)) + '%'
          else
            opt.percent = '0%'

          return opt
        })
      }
    },
    methods: {
      handleVote(opt) {
        this.$emit('vote-submit', opt)
      }
    }
  }
</script>

<style>
  .vue-poll {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .vue-poll .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .vue-poll .qst {
    font-weight: normal;
  }

  .vue-poll .ans-cnt {
    margin: 20px 0;
  }

  .vue-poll .ans-cnt .ans {
    position: relative;
    margin-top: 10px;
  }

  .vue-poll .ans-cnt .ans:first-child {
    margin-top: 0;
  }

  .vue-poll .ans-cnt .ans-no-vote {
    text-align: center;
    border: 2px solid #77C7F7;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 0;
    transition: background .2s ease-in-out;
    -webkit-transition: background .2s ease-in-out;
    -moz-transition: background .2s ease-in-out;
  }

  .vue-poll .ans-cnt .ans-no-vote .txt {
    color: #77C7F7;
    transition: color .2s ease-in-out;
    -webkit-transition: color .2s ease-in-out;
    -moz-transition: color .2s ease-in-out;
  }

  .vue-poll .ans-cnt .ans-no-vote.active {
    background: #77C7F7;
  }

  .vue-poll .ans-cnt .ans-no-vote.active .txt {
    color: #fff;
  }

  .vue-poll .ans-cnt .ans-voted {
    padding: 5px 0;
  }

  .vue-poll .ans-cnt .ans-voted .percent,
  .vue-poll .ans-cnt .ans-voted .txt {
    position: relative;
    z-index: 1;
  }

  .vue-poll .ans-cnt .ans-voted .percent {
    font-weight: bold;
    min-width: 51px;
    display: inline-block;
    margin: 0 10px;
  }

  .vue-poll .ans-cnt .ans-voted.selected .txt:after {
    content: '✔';
    margin-left: 10px;
  }

  .vue-poll .ans-cnt .ans .bg {
    position: absolute;
    width: 0%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
    background-color: #E1E8ED;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: all .3s cubic-bezier(0.5, 1.2, .5, 1.2);
    -webkit-transition: all .3s cubic-bezier(0.5, 1.2, .5, 1.2);
    -moz-transition: all .3s cubic-bezier(0.5, 1.2, .5, 1.2);
  }

  .vue-poll .ans-cnt .ans .bg.selected {
    background-color: #77C7F7;
  }

  .vue-poll .votes {
    font-size: 14px;
    color: #8899A6
  }

  .vue-poll .submit {
    display: block;
    text-align: center;
    margin: 0 auto;
    max-width: 80px;
    text-decoration: none;
    background-color: #41b882;
    color: #fff;
    padding: 10px 25px;
    border-radius: 5px;
  }
</style>

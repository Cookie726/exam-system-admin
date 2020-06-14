<template>
  <div class="question-operation operation-check">
    <i
      @click="handleRight"
      class="icon el-icon-check"
      :class="{ 'icon-checked': score == maxScore }"
    ></i>
    <i
      @click="handleWrong"
      class="icon el-icon-close"
      :class="{ 'icon-checked': score != maxScore }"
    ></i>

    <div class="input-group">
      <input
        type="text"
        name="questionScore"
        class="form-control question-score"
        v-model="score"
      />
      <span class="input-group-addon">分</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxScore: Number,
    questionId: Number,
  },
  data() {
    return {
      score: 0,
    };
  },
  watch: {
    score(newval) {
      if (newval > this.maxScore) {
        this.score = this.maxScore;
      } else if (newval < 0) {
        this.score = 0;
      }
      this.setScore();
    },
  },
  methods: {
    setScore() {
      this.$store.commit("markPaper/SET_SCORE", {
        questionId: this.questionId,
        score: +this.score,
        tag: this.score == this.maxScore ? 1 : 0,
      });
    },
    handleRight() {
      this.score = this.maxScore;
    },
    handleWrong() {
      this.score = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.question-operation {
  z-index: 999;
  width: 141px !important;
  height: 28px !important;
  top: 29px !important;
  line-height: 28px;
  padding-left: 66px;
}
.icon {
  position: absolute;
  top: 0;
  font-size: 14px;
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  background: #fafafa;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  color: #d8d8d8;
  &.el-icon-close {
    left: 33px;
    font-size: 24px;
    font-weight: 600;
    &:hover {
      background: #ff0000;
      color: #fff;
      border-color: #ff0000;
    }
    &.icon-checked {
      background: #ff0000;
      color: #fff;
      border-color: #ff0000;
    }
  }
  &.el-icon-check {
    left: 0;
    font-size: 24px;
    font-weight: 600;
    &:hover {
      background: #1a8cfe;
      color: #fff;
      border-color: #1a8cfe;
    }
    &.icon-checked {
      background: #1a8cfe;
      color: #fff;
      border-color: #1a8cfe;
    }
  }
}
.input-group {
  width: 75px;
  display: inline-table;
  position: relative;
  .form-control {
    height: 28px;
    padding: 4px 10px;
    display: table-cell;
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
    border-color: #d8d8d8;
    font-size: 14px;
    line-height: 1.42857143;
    color: #9090a4;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .input-group-addon {
    padding: 4px 6px;
    border-color: #d8d8d8;
    background: #f1f3f8;
    color: #27274a;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    display: table-cell;
    line-height: 1;
    vertical-align: middle;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    &:last-child {
      border-left: 0;
    }
  }
}
</style>

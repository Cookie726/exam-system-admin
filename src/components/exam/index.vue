<template>
  <div class="exam-container">
    <div class="left">
      <answer-sheet :pageName="pageName" :list="sheetList"></answer-sheet>
    </div>
    <div class="middle">
      <template v-for="(problem, index) in questionList"
        ><problem
          :key="problem.id"
          :index="index"
          :pageName="pageName"
          :question="problem"
          :startTime="startTime"
          :endTime="endTime"
          :paperId="paperId"
        ></problem
      ></template>
    </div>
    <div class="right">
      <exam-board
        :timeLimit="timeLimit"
        :paperId="paperId"
        :isAnswer="isAnswer"
        :pageName="pageName"
        :startTime="startTime"
        :endTime="endTime"
      ></exam-board>
    </div>
  </div>
</template>

<script>
import AnswerSheet from "@/components/answerSheet";
import ExamBoard from "@/components/examBoard";
import Problem from "../problem";
export default {
  components: {
    problem: Problem,
    "answer-sheet": AnswerSheet,
    "exam-board": ExamBoard,
  },
  props: {
    paperId: Number,
    questionList: Array,
    timeLimit: Number,
    startTime: String,
    endTime: String,
  },
  data() {
    return {};
  },
  computed: {
    sheetList() {
      const list = [];
      this.questionList.forEach((problem) => {
        if (this.pageName === "examStart" || this.pageName === "paperPreview") {
          list.push({
            id: problem.id,
          });
        } else {
          list.push({
            id: problem.id,
            isRight: problem.value === problem.score,
          });
        }
      });
      return list;
    },
    isAnswer() {
      const isAnswer = this.$route.name === "examStart";
      return isAnswer;
    },
    pageName() {
      return this.$route.name;
    },
  },
  mounted() {
    this._init_flag();
    this._init_done();
  },
  methods: {
    _init_flag() {
      if (this.pageName === "examStart" || this.pageName === "paperPreview") {
        this.$store.commit("exercise/INIT_FLAG", this.questionList.length);
      }
    },
    _init_done() {
      if (this.pageName === "examStart" || this.pageName === "paperPreview") {
        this.$store.commit("exercise/INIT_DONE", this.questionList.length);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@bg: #eff3f7;
.exam-container {
  width: 100%;
  background: @bg;
  padding-bottom: 80px;
  min-height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    width: 360px;
    min-width: 360px;
  }
  .middle {
    padding-left: 30px;
    padding-right: 75px;
    background-color: #fff;
    min-width: 280px;
    flex: 1;
  }
  .right {
    width: 260px;
  }
}
</style>

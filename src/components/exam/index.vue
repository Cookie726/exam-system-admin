<template>
  <div class="exam-container">
    <div class="left">
      <answer-sheet :isAnswer="isAnswer" :list="sheetList"></answer-sheet>
    </div>
    <div class="middle">
      <template v-for="(problem, index) in paperInfo"
        ><problem
          :key="problem.id"
          :index="index"
          :isAnswer="isAnswer"
          :question="problem"
          :paperId="paperId"
        ></problem
      ></template>
    </div>
    <div class="right">
      <exam-board :paperId="paperId" :isAnswer="isAnswer"></exam-board>
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
  },
  data() {
    return {
      paperInfo: [
        {
          id: "10001",
          type: "简答题",
          content: "<p>撒<b>地方1</b></p><p>撒地方<i>双方的给</i> 非观</p>",
          score: 10,
          index: 1,
          optionList: [],
        },
        {
          id: "10002",
          type: "判断题",
          content: "<p>撒<b>地方1</b></p><p>撒地方<i>双方的给</i> 非观</p>",
          score: 10,
          index: 1,
          optionList: [
            {
              choice: "正确",
              id: 1,
            },
            {
              choice: "错误",
              id: 2,
            },
          ],
        },
        {
          id: "10003",
          type: "单选题",
          content: "<p>撒<b>地方1</b></p><p>撒地方<i>双方的给</i> 非观</p>",
          score: 10,
          index: 1,
          optionList: [
            {
              choice: "<p>阀手动阀撒地方</p>",
              id: 1,
            },
            {
              choice: "<p>阀手动阀撒暗室逢灯地方</p>",
              id: 2,
            },
            {
              choice: "<p>阀手嘎嘎嘎动阀撒地方</p>",
              id: 3,
            },
            {
              choice: "<p>阀手动阀华国锋撒地方</p>",
              id: 4,
            },
          ],
        },
        {
          id: "10004",
          type: "多选题",
          content: "<p>撒<b>地方1</b></p><p>撒地方<i>双方的给</i> 非观</p>",
          score: 10,
          index: 1,
          optionList: [
            {
              choice: "<p>阀手动阀撒地方</p>",
              id: 1,
            },
            {
              choice: "<p>阀手动阀撒暗室逢灯地方</p>",
              id: 2,
            },
            {
              choice: "<p>撒地方阀手嘎嘎嘎动阀撒地方</p>",
              id: 3,
            },
            {
              choice: "<p>阀手动阀华国锋撒地方</p>",
              id: 4,
            },
          ],
        },
      ],
    };
  },
  computed: {
    sheetList() {
      const list = [];
      this.paperInfo.forEach((problem) => {
        list.push({ id: problem.id });
      });
      return list;
    },
    isAnswer() {
      const isAnswer = this.$route.name === "examStart";
      return isAnswer;
    },
  },
  mounted() {
    this._init_flag();
    this._init_done();
    this._init_store();
  },
  methods: {
    _init_flag() {
      this.$store.commit("exercise/INIT_FLAG", this.paperInfo.length);
    },
    _init_done() {
      this.$store.commit("exercise/INIT_DONE", this.paperInfo.length);
    },
    _init_store() {
      if (!this.isAnswer) {
        const data = {};
        data.paperId = this.$route.params.id;
        data.questionIdList = this.paperInfo.map((paperItem) => paperItem.id);
        this.$store.commit("markPaper/INIT", data);
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

<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="创建试卷"></el-step>
      <el-step title="添加试题"></el-step>
      <el-step title="发布试卷"></el-step>
    </el-steps>
    <first-stage
      v-if="currentStage === 'first'"
      @toTwoStage="toTwoStage"
    ></first-stage
    ><second-stage
      :title.sync="newPaper.title"
      @toThirdStage="toThirdStage"
      @goBack="goBack"
      :addQuestion="addQuestion"
      v-if="currentStage === 'second'"
    ></second-stage>
    <third-stage
      :title="newPaper.title"
      :newPaper="newPaper"
      :changeData="changeData"
      :handleSubmit="handleSubmit"
      v-if="currentStage === 'third'"
    ></third-stage>
  </div>
</template>

<script>
import FirstStage from "./components/firstStage";
import SecondStage from "./components/secondStage";
import ThirdStage from "./components/thirdStage";
import { addPaper } from "@/api/paperQuestionManage";
export default {
  data() {
    return {
      newPaper: {
        title: "",
        classify: "",
        paperScore: 0,
        user: {},
        startTime: "",
        endTime: "",
        studentIdList: [],
        timeLimit: null,
      },
      currentStage: "first",
      active: 0,
    };
  },
  mounted() {
    this.newPaper.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    toTwoStage(paperInfo) {
      Object.assign(this.newPaper, paperInfo);
      this.currentStage = "second";
      this.active++;
    },
    goBack(currentStage) {
      this.currentStage = currentStage;
    },
    toThirdStage() {
      this.currentStage = "third";
      this.active++;
    },
    addQuestion(questionList) {
      let paperScore = 0;
      questionList.forEach((q) => (paperScore += q.score));
      let list = questionList.map((q) => {
        return {
          id: q.id,
          value: q.score,
        };
      });
      this.newPaper.questionList = list;
      this.newPaper.paperScore = paperScore;
    },
    changeData(prop, value) {
      this.newPaper[prop] = value;
    },
    handleSubmit() {
      const {
        title,
        startTime,
        endTime,
        timeLimit,
        paperScore,
        classify,
        studentIdList,
        questionList,
      } = this.newPaper;
      questionList.forEach((ques) => {
        ques.questionId = ques.id;
        delete ques.id;
      });
      const params = {
        paper: { title, startTime, endTime, timeLimit, paperScore, classify },
        studentIdList,
        questionList,
      };
      addPaper(params)
        .then((res) => {
          if (res.code === 0) {
            window.ELEMENT.Message.success("试卷添加成功");
            window.location.reload();
          } else {
            window.ELEMENT.Message.error(res.msg);
            throw new Error(res.msg);
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
  },
  components: {
    "first-stage": FirstStage,
    "second-stage": SecondStage,
    "third-stage": ThirdStage,
  },
};
</script>

<style scoped></style>

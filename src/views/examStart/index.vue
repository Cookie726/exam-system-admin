<template>
  <div class="mark-exam-container">
    <nav-bar></nav-bar>
    <exam
      :questionList="questionList"
      :timeLimit="timeLimit"
      :paperId="paperId"
      :startTime="startTime"
      :endTime="endTime"
    ></exam>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import Exam from "@/components/exam";
import { getPaperInfo } from "@/api/home";
export default {
  components: {
    exam: Exam,
    "nav-bar": NavBar,
  },
  computed: {
    paperId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    getPaperInfo(this.paperId).then((res) => {
      if (res.code === 0) {
        this.questionList = res.data.questionList;
        this.timeLimit = res.data.paperInfo.timeLimit * 60;
        this.startTime = res.data.paperInfo.startTime
        this.endTime = res.data.paperInfo.endTime
      }
    });
  },
  data() {
    return {
      questionList: [],
      timeLimit: 0,
      startTime: "",
      endTime: ""
    };
  },
};
</script>

<style lang="less">
.mark-exam-container {
  padding-top: 70px;
  background: #eff3f7;
  min-height: 100%;
}
</style>

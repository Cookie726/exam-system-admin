<template>
  <div class="mark-exam-container">
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
import Exam from "@/components/exam";
import { getPaperInfo } from "@/api/home";
export default {
  components: {
    exam: Exam,
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
        this.questionList.forEach((question) => {
          for (var i = 0; i < question.optionList.length; i++) {
            var iRand = parseInt(question.optionList.length * Math.random());
            var temp = question.optionList[i];
            question.optionList[i] = question.optionList[iRand];
            question.optionList[iRand] = temp;
          }
        });
        this.timeLimit = res.data.paperInfo.timeLimit * 60;
        this.startTime = res.data.paperInfo.startTime;
        this.endTime = res.data.paperInfo.endTime;
      }
    });
  },
  data() {
    return {
      questionList: [],
      timeLimit: 0,
      startTime: "",
      endTime: "",
    };
  },
};
</script>

<style lang="less" scoped>
.mark-exam-container {
  padding-top: 20px;
  background: #eff3f7;
  min-height: 100%;
}
</style>

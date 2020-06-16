<template>
  <div class="mark-exam-container">
    <exam
      :userName="userName"
      :studentScore="studentScore"
      :questionList="questionList"
    ></exam>
  </div>
</template>

<script>
import Exam from "@/components/exam";
import { getRecordDetail } from "@/api/examRecord";
export default {
  components: {
    exam: Exam,
  },
  data() {
    return {
      questionList: [],
      userName: "",
      studentScore: 0,
    };
  },
  mounted() {
    this.setData();
    this.userName = this.$store.state.user.user.userName;
  },
  methods: {
    setData() {
      getRecordDetail(this.$route.params.id).then((res) => {
        if (res.code === 0) {
          this.questionList = res.data.recordQuestionDTOList;
          this.studentScore = res.data.recordPaperInfoDTO.gradesDTO?.score || 0;
        }
      });
    },
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

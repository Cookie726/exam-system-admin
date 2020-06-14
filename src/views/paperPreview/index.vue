<template>
  <div class="mark-exam-container">
    <exam
      :paperId="paperId"
      :timeLimit="timeLimit"
      :questionList="questionList"
    ></exam>
  </div>
</template>

<script>
import Exam from "@/components/exam";
import { getExam } from "@/api/paperQuestionManage";
export default {
  components: {
    exam: Exam,
  },
  data() {
    return {
      questionList: [],
      timeLimit: 0,
    };
  },
  mounted() {
    this.setData();
  },
  computed: {
    paperId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async setData() {
      try {
        const res = await getExam(this.paperId);
        if (res.code === 0) {
          this.questionList = res.data.questionList;
          this.timeLimit = res.data.paperInfo.timeLimit * 60;
        } else {
          window.ELEMENT.Message.error(res.msg);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mark-exam-container {
  padding-top: 20px;
  background: #eff3f7;
}
</style>

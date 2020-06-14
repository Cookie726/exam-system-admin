<template>
  <div class="mark-exam-container">
    <exam :questionList="questionList"></exam>
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
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      getRecordDetail(this.$route.params.id).then((res) => {
        if (res.code === 0) {
          this.questionList = res.data.recordQuestionDTOList;
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
}
</style>

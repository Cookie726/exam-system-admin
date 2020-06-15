<template>
  <div class="mark-exam-container">
    <exam :questionList="questionList"></exam>
  </div>
</template>

<script>
import Exam from "@/components/exam";
import { getRecord } from "@/api/paperQuestionManage";
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
      const data = {
        paperId: this.$route.params.id,
        userId: this.$route.params.userId,
      };
      getRecord(data).then((res) => {
        if (res.code === 0) {
          this.questionList = res.data.recordQuestionDTOList;
          this._init_store();
        }
      });
    },
    _init_store() {
      const data = {};
      data.paperId = this.$route.params.id;
      data.userId = this.$route.params.userId;
      data.questionIdList = [];
      this.questionList.forEach((ques) => {
        data.questionIdList.push(ques.id);
      });
      this.$store.commit("markPaper/INIT", data);
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

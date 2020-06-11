<template>
  <div class="mark-exam-container">
    <nav-bar></nav-bar>
    <exam
      :questionList="questionList"
      :timeLimit="timeLimit"
      :paperId="paperId"
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
        this.timeLimit = res.data.paper.timeLimit;
      }
    });
  },
  data() {
    return {
      questionList: [
        {
          id: 1,
          content: "<p>简答题</p>",
          questionType: "简答题",
          analysis: "<p>这是解析</p>",
          value: 10,
          optionList: [
            {
              id: 1,
              choice: "<p>这是答案</p>",
            },
          ],
        },
      ],
      timeLimit: 150 * 60,
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

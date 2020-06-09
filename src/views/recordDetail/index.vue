<template>
  <div class="mark-exam-container">
    <nav-bar></nav-bar>
    <exam :questionList="questionList"></exam>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import Exam from "@/components/exam";
export default {
  components: {
    exam: Exam,
    "nav-bar": NavBar,
  },
  data() {
    return {
      questionList: [
        {
          id: 1,
          content: "<p>这是单选题题目</p>",
          questionType: "单选题",
          analysis: "<p>这是单选题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这道题选A</p>",
            },
            {
              status: 0,
              id: 2,
              choice: "<p>这道题选B</p>",
            },
            {
              status: 0,
              id: 3,
              choice: "<p>这道题选C</p>",
            },
            {
              status: 0,
              id: 4,
              choice: "<p>这道题选D</p>",
            },
          ],
          value: 10,
          score: 0,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 2,
            },
          ],
          filePath: "",
        },
        {
          id: 2,
          content: "<p>这是多选题题目</p>",
          questionType: "多选题",
          analysis: "<p>这是多选题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这道题选A</p>",
            },
            {
              status: 0,
              id: 2,
              choice: "<p>这道题选B</p>",
            },
            {
              status: 1,
              id: 3,
              choice: "<p>这道题选C</p>",
            },
            {
              status: 0,
              id: 4,
              choice: "<p>这道题选D</p>",
            },
          ],
          value: 10,
          score: 10,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 1,
            },
            {
              id: 3,
            },
          ],
          filePath: "",
        },
        {
          id: 3,
          content: "<p>这是简答题题目</p>",
          questionType: "简答题",
          analysis: "<p>这是简答题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这是简答题答案</p>",
            },
          ],
          value: 10,
          score: 8,
          studentAnswer: "<p>这是学生的答案</p>",
          studentOptionList: [],
          filePath: "",
        },
        {
          id: 4,
          content: "<p>这是判断题题目</p>",
          questionType: "判断题",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "正确",
            },
            {
              status: 0,
              id: 2,
              choice: "错误",
            },
          ],
          value: 10,
          score: 10,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 1,
            },
          ],
          filePath: "",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.mark-exam-container {
  padding-top: 70px;
  background: #eff3f7;
}
</style>

<template>
  <div>
    <question-content
      :content="question.content"
      :questionType="question.questionType"
      :value="question.value"
    ></question-content>
    <question-option
      :optionList="question.optionList"
      :questionType="question.questionType"
    ></question-option>
    <question-answer
      :optionList="question.optionList"
      :questionType="question.questionType"
      :analysis="question.analysis"
    ></question-answer>
  </div>
</template>

<script>
import QuestionContent from "@/components/questionContent";
import QuestionOption from "@/components/questionOption";
import QuestionAnswer from "@/components/questionAnswer";
export default {
  props: {
    question: {},
  },
  data() {
    return {};
  },
  components: {
    QuestionContent,
    QuestionOption,
    QuestionAnswer,
  },
};
</script>

<style></style>

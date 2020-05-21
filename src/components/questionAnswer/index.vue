<template>
  <div>
    <div class="answer">
      <span class="title">答案：</span
      ><div class="content" v-html="questionAns"></div>
    </div>
    <div class="answer">
      <span class="title">解析：</span
      ><div class="content" v-html="analysis"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    analysis: String,
    questionType: String,
    optionList: Array,
  },
  computed: {
    questionAns() {
      let ans = "";
      if (this.questionType === "简答题") {
        ans = this.optionList[0].choice;
      } else if (this.questionType === "判断题") {
        this.optionList.forEach((option) => {
          if (option.status === 1) {
            ans = option.choice;
          }
        });
      } else {
        this.optionList.forEach((option, i) => {
          if (option.status === 1) {
            ans += String.fromCharCode(i + 65);
          }
        });
      }
      return ans;
    },
  },
};
</script>

<style lang="less" scoped>
.answer {
  margin-left: 84px;
  position: relative;
  line-height: 26px;
  .title {
    position: absolute;
    left: -20px;
    font-size: 16px;
  }
  .content {
      margin-left: 26px;
  }
}
</style>

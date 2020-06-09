<template>
  <div class="question-content">
    <span class="question-type">{{ questionType }}</span>
    <div class="main-content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    questionType: String,
  },
};
</script>

<style lang="less" scoped>
.question-content {
  position: relative;
  color: #333;
  margin-bottom: 20px;
  .question-type {
    padding: 6px 8px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    background-color: #c2c2c2;
    position: absolute;
  }
  .main-content {
    font-size: 16px;
    margin-left: 64px;
  }
}
</style>

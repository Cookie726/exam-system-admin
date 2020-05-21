<template>
  <div>
    <template v-if="questionType !== '简答题'">
      <div
        class="option-container"
        :key="index"
        v-for="(option, index) in optionList"
      >
        <span class="words-option">{{ index | numberToLetter }}.</span
        ><span class="option" v-html="option.choice"></span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    optionList: Array,
    questionType: String,
  },
};
</script>

<style lang="less" scoped>
.option-container {
  position: relative;
  margin-left: 84px;
  line-height: 20px;
  color: #333;
  margin-bottom: 20px;
  .words-option {
    position: absolute;
    top: 0px;
    font-weight: 400;
    left: -20px;
  }
  .option {
    display: block;
  }
}
</style>

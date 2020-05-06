<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="创建试卷"></el-step>
      <el-step title="添加试题"></el-step>
      <el-step title="发布试卷"></el-step>
    </el-steps>
    <first-stage
      v-if="currentStage === 'first'"
      @toTwoStage="toTwoStage"
    ></first-stage
    ><second-stage
      :title="newPaper.title"
      @toThirdStage="toThirdStage"
      @goBack="goBack"
      v-if="currentStage === 'second'"
    ></second-stage>
    <third-stage v-if="currentStage === 'third'"></third-stage>
  </div>
</template>

<script>
import FirstStage from "./components/firstStage";
import SecondStage from "./components/secondStage";
import ThirdStage from "./components/thirdStage";
export default {
  data() {
    return {
      newPaper: {},
      currentStage: "first",
      active: 0,
    };
  },
  methods: {
    toTwoStage(paperInfo) {
      Object.assign(this.newPaper, paperInfo);
      this.currentStage = "second";
      this.active++;
    },
    goBack(currentStage) {
      this.currentStage = currentStage;
    },
    toThirdStage() {
      this.currentStage = "third";
      this.active++;
    },
  },
  components: {
    "first-stage": FirstStage,
    "second-stage": SecondStage,
    "third-stage": ThirdStage,
  },
};
</script>

<style scoped></style>

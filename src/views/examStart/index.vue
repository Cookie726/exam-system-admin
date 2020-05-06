<template>
  <div class="mark-exam-container">
    <nav-bar></nav-bar>
    <exam></exam>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import Exam from "../../components/exam";
export default {
  mounted() {
    console.log(this.$route);
  },
  components: {
    exam: Exam,
    "nav-bar": NavBar,
  },
};
</script>

<style lang="less" scoped>
.mark-exam-container {
  padding-top: 70px;
  background: #eff3f7;
}
</style>

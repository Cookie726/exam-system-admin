<template>
  <div class="mark-exam-container">
    <nav-bar></nav-bar>
    <exam :paperId="paperId"></exam>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import Exam from "../../components/exam";
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
};
</script>

<style lang="less" scoped>
.mark-exam-container {
  padding-top: 70px;
  background: #eff3f7;
}
</style>

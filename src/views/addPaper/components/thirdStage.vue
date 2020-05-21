<template>
  <paper-info :handleSubmit="handleSubmit" :changeData="changeData" :paperInfo="newPaper"></paper-info>
</template>

<script>
import PaperInfo from "@/components/paperInfo";
export default {
  props: {
    title: String,
    newPaper: Object,
    changeData: Function,
    handleSubmit: Function
  },
  components: {
    PaperInfo,
  },
};
</script>

<style></style>

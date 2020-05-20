<template>
  <el-dialog
    width="1100px"
    :before-close="handleBeforeClose"
    title="编辑试卷"
    center
    :visible="showPaperInfoDialog"
  >
    <paper-info @submit="handleUpdate"></paper-info>
  </el-dialog>
</template>

<script>
import { formatDate } from "@/utils/helpers";
import PaperInfo from "@/components/paperInfo";
export default {
  props: {
    showPaperInfoDialog: {
      default: false,
      type: Boolean,
    },
    id: Number
  },
  mounted() {
    console.log("1");
  },
  methods: {
    handleBeforeClose(done) {
      this.$emit("update:showPaperInfoDialog", false);
      done();
    },
    handleUpdate(paperForm) {
      let { title, classify, studentIdList, during } = paperForm;
      let [startTime, endTime] = [formatDate(during[0]), formatDate(during[1])];
      let data = {
        title,
        classify,
        startTime,
        endTime,
        studentIdList,
        id: this.id
      };
      console.log(data);
    },
  },
  components: {
    PaperInfo,
  },
};
</script>

<style></style>

<template>
  <el-dialog
    width="80%"
    :close-on-click-modal="false"
    title="添加试题"
    @close="close"
    :visible="dialogAddQuestion"
    :center="true"
  >
    <div class="el-dialog-div">
      <manual-addition></manual-addition>
    </div>
  </el-dialog>
</template>

<script>
import ManualAddition from "./manualAddition";
export default {
  props: {
    dialogAddQuestion: Boolean,
    handleCloseAddQuestion: Function,
  },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    close() {
      this.handleCloseAddQuestion();
    },
    handleConfirm() {
      this.close();
    },
  },
  components: {
    "manual-addition": ManualAddition,
  },
};
</script>

<style lang="less" scoped>
.el-dialog-div {
  overflow: auto;
}
</style>
<style>
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* max-height: calc(100% - 30px); */
  min-height: 400px;
  height: 80%;
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 0px 25px 50px;
}
</style>

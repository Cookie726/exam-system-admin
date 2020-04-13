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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="题库添加" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="手动添加" name="second">
          <manual-addition></manual-addition>
        </el-tab-pane>
        <el-tab-pane label="导入文件" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ManualAddition from "./manualAddition";
export default {
  props: {
    dialogAddQuestion: Boolean
  },
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    "manual-addition": ManualAddition
  }
};
</script>

<style lang="less" scoped>
.el-dialog-div {
  height: 60vh;
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
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 0px 25px 30px;
}
</style>

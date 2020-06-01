<template>
  <el-dialog
    width="740px"
    title="提交列表"
    :before-close="handleBeforeClose"
    :visible="dialogTableVisible"
  >
    <div>
      <el-table :data="gridData">
        <el-table-column
          property="user.userName"
          label="姓名"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="submitTime"
          label="提交时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column property="isSubmit" align="center" label="提交">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isSubmit === 1 ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.isSubmit | getSubmitTag }}</el-tag
            >
          </template></el-table-column
        >
        <el-table-column
          property="isMark"
          label="判卷"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleCorrect(scope.row.isMark, scope.row.user.id)"
              size="mini"
              :type="scope.row.isMark === 1 ? 'warning' : 'primary'"
              :disabled="scope.row.isSubmit === 0"
              >{{ scope.row.isMark | getMarkText }}</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { getSubmitList } from "@/api/paperQuestionManage";
export default {
  props: {
    dialogTableVisible: {
      default: false,
      type: Boolean,
    },
    paperId: Number,
  },
  methods: {
    handleBeforeClose(done) {
      this.$emit("update:dialogTableVisible", false);
      done();
    },
    handleCorrect(isMark, userId) {
      console.log(this.paperId);
      if (isMark === 1) {
        this.$message({
          message: "该学生的试卷已经被批改",
          type: "warning",
        });
      } else {
        if (!this.paperId || !userId) {
          this.$message({
            message: "程序出错",
            type: "error",
          });
        } else {
          const markExamData = this.$router.resolve({
            name: "markExam",
            params: {
              id: this.paperId,
              userId,
            },
          });
          window.open(markExamData.href, "_blank");
        }
      }
    },
  },
  watch: {
    dialogTableVisible(newVal) {
      if (newVal === true) {
        const loading = this.$loading({
          lock: true,
          text: "加载中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        getSubmitList(this.paperId)
          .then((res) => {
            loading.close();
            if (res.code === 0) {
              this.gridData = res.data;
            } else {
              throw new Error(res.msg);
            }
          })
          .catch((e) => {
            loading.close();
            throw new Error(e);
          });
      }
    },
  },
  data() {
    return {
      gridData: [],
    };
  },
};
</script>

<style></style>

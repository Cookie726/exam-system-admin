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

      <el-pagination
        style="text-align: center"
        :current-page="1"
        :page-size="10"
        layout="prev, pager, next"
        :total="400"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
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
        setTimeout(() => {
          console.log("加载数据");
        }, 2000);
      }
    },
  },
  data() {
    return {
      gridData: [
        {
          user: {
            id: 1,
            userName: "潘炳名",
          },
          isSubmit: 1,
          submitTime: "2020/05/19 21:02",
          isMark: 1,
        },
        {
          user: {
            id: 1,
            userName: "潘炳名",
          },
          isSubmit: 1,
          submitTime: "2020/05/19 21:02",
          isMark: 0,
        },
        {
          user: {
            id: 1,
            userName: "潘炳名",
          },
          isSubmit: 0,
          submitTime: "2020/05/19 21:02",
          isMark: 0,
        },
        {
          user: {
            id: 1,
            userName: "潘炳名",
          },
          isSubmit: 1,
          submitTime: "2020/05/19 21:02",
          isMark: 1,
        },
        {
          user: {
            id: 1,
            userName: "潘炳名",
          },
          isSubmit: 1,
          submitTime: "2020/05/19 21:02",
          isMark: 0,
        },
      ],
    };
  },
};
</script>

<style></style>

<template>
  <el-dialog
    width="50%"
    title="成绩分析"
    center
    :before-close="handleBeforeClose"
    :visible="showMarkDialog"
  >
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="成绩单">
          <el-table :data="studentList" style="width: 100%">
            <el-table-column align="center" label="姓名" width="200">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.student.userName }}</p>
                  <p>学号: {{ scope.row.student.sno }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{
                      scope.row.student.userName
                    }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提交时间" width="300">
              <template slot-scope="scope">
                <i
                  class="el-icon-time"
                  v-if="scope.row.paperStudentDTO.isSubmit === 1"
                ></i>
                <span style="margin-left: 10px">{{
                  scope.row.paperStudentDTO.isSubmit === 1
                    ? scope.row.submitTime
                    : "未提交"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="分数" prop="score">
              <template slot-scope="scope">{{ scope.score || 0 }}</template>
            </el-table-column>
          </el-table>
          <div style="text-align: center; margin-top: 12px">
            <el-button @click="getExcel" type="warning">导出成绩</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成绩统计">
          <div class="row">
            <div>
              <div class="form-row">
                <span class="title">考试分类</span
                ><span class="content">{{ paper.classify }}</span>
              </div>
              <div class="form-row">
                <span class="title">总分</span
                ><span class="content">{{ paper.paperScore }}</span>
              </div>
              <div class="form-row">
                <span class="title">答题时长</span
                ><span class="content">{{ paper.timeLimit }}</span>
              </div>
              <div class="form-row">
                <span class="title">考试时间</span
                ><span class="content"
                  >{{ paper.startTime }} ~ {{ paper.endTime }}</span
                >
              </div>
            </div>
            <div>
              <div class="form-row">
                <span class="title">参考人数</span
                ><span class="content">{{ studentList.length }}</span>
              </div>
              <div class="form-row">
                <span class="title">平均分</span
                ><span class="content">{{ averageScore }}</span>
              </div>
              <div class="form-row">
                <span class="title">最高分</span
                ><span class="content">{{ maxScore }}</span>
              </div>
              <div class="form-row">
                <span class="title">最低分</span
                ><span class="content">{{ minScore }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import { getGrades } from "@/api/paperQuestionManage";
export default {
  props: {
    showMarkDialog: {
      default: false,
      type: Boolean,
    },
    paperId: Number,
  },
  methods: {
    getGrades() {
      return 1;
    },
    handleBeforeClose(done) {
      this.$emit("update:showMarkDialog", false);
      done();
    },
    getExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js");
        const tHeader = ["姓名", "分数", "提交时间"];
        const filterVal = ["student.userName", "score", "submitTime"];
        const list = this.studentList;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, `${this.paper.title}-成绩表`);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          let m = v;
          j.split(".").forEach((e) => {
            m = m[e];
          });
          return m;
        })
      );
    },
  },
  watch: {
    showMarkDialog(newVal) {
      if (newVal === true) {
        const loading = this.$loading({
          lock: true,
          text: "加载中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        getGrades(this.paperId)
          .then((res) => {
            if (res.code === 0) {
              this.paper = res.data.paper;
              this.studentList = res.data.studentList;
              console.log(this.studentList);
            } else {
              throw new Error(res.msg);
            }
          })
          .catch((e) => {
            throw new Error(e);
          })
          .finally(() => {
            loading.close();
          });
      }
    },
  },
  data() {
    return {
      paper: {},
      studentList: [],
    };
  },
  computed: {
    maxScore() {
      return Math.max(...this.studentList.map((s) => s.score));
    },
    minScore() {
      return Math.min(...this.studentList.map((s) => s.score));
    },
    averageScore() {
      let total = 0;
      this.studentList
        .map((s) => s.score)
        .forEach((score) => {
          total += score;
        });
      return Math.floor(total / this.studentList.length);
    },
  },
};
</script>
<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 30px;
  .form-row {
    margin-bottom: 20px;
    .title {
      color: #9090a4;
      display: inline-block;
      width: 70px;
    }
    .content {
      color: #4a4a4a;
    }
  }
}
</style>

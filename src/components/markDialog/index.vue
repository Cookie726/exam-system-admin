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
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.submitTime
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="分数" prop="score">
            </el-table-column>
          </el-table>
          <el-pagination
            style="text-align: center"
            :current-page="1"
            :page-size="10"
            layout="prev, pager, next"
            :total="400"
          >
          </el-pagination>
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
export default {
  props: {
    showMarkDialog: {
      default: false,
      type: Boolean,
    },
    paperId: Number,
  },
  methods: {
    handleBeforeClose(done) {
      this.$emit("update:showMarkDialog", false);
      done();
    },
  },
  watch: {
    showMarkDialog(newVal) {
      if (newVal === true) {
        setTimeout(() => {
          console.log("加载数据");
        }, 2000);
      }
    },
  },
  data() {
    return {
      paper: {
        title: "前端第一次测试",
        createTime: "2020/05/19 21:54",
        startTime: "2020/05/20 12:00",
        endTime: "2020/05/25 12:00",
        timeLimit: 3600,
        user: {
          userName: "潘炳名",
        },
        classify: "前端",
        paperScore: 100,
      },
      studentList: [
        {
          student: {
            userName: "程咬金",
            sno: "2018010280",
          },
          score: 60,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
            sno: "2018010280",
          },
          score: 70,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
            sno: "2018010280",
          },
          score: 80,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
            sno: "2018010280",
          },
          score: 40,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
            sno: "2018010280",
          },
          score: 50,
          submitTime: "2020/05/20 16:25",
        },
      ],
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

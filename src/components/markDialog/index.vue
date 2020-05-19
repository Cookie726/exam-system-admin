<template>
  <el-dialog
    width="80%"
    title="成绩分析"
    center
    :before-close="handleBeforeClose"
    :visible="showMarkDialog"
  >
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
          },
          score: 60,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
          },
          score: 70,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
          },
          score: 80,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
          },
          score: 40,
          submitTime: "2020/05/20 16:25",
        },
        {
          student: {
            userName: "程咬金",
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

<style></style>

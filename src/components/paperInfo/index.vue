<template>
  <div class="paper-info-container">
    <div class="left">
      <el-form :model="paperForm" :ref="paperForm">
        <el-form-item label="考试名称">
          <el-input style="width: 60%" v-model="paperForm.title"></el-input>
        </el-form-item>
        <el-form-item label="考试分类" prop="classify">
          <el-input style="width: 60%" v-model="paperForm.classify"></el-input>
        </el-form-item>
        <el-form-item label="答题时间" prop="during">
          <el-date-picker
            v-model="paperForm.during"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可考学员" prop="student">
          <el-select multiple v-model="paperForm.studentIdList">
            <el-option
              v-for="stu in studentList"
              :value="stu.sno"
              :key="stu.sno"
              :label="stu.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <div class="info-card">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span
              >{{ paperForm.title
              }}<span class="paper-type">(选题组卷)</span></span
            >
          </div>
          <div class="form-row">
            <span class="title">总分：</span>
            <span class="content">{{ paperForm.paperScore }}</span>
          </div>
          <div class="form-row">
            <span class="title">创建人：</span>
            <span class="content">{{ paperForm.user.userName }}</span>
          </div>
          <div class="form-row">
            <span class="title">题目数量：</span> <span class="content">1</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      paperForm: {
        title: "",
        createTime: "",
        during: [],
        classify: "",
        paperScore: 0,
        studentIdList: [],
        user: {},
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "未来一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      studentList: [
        {
          sno: "2018010280",
          userName: "张三",
        },
        {
          sno: "2018010281",
          userName: "李四",
        },
        {
          sno: "2018010282",
          userName: "小二",
        },
        {
          sno: "2018010283",
          userName: "老王",
        },
      ],
    };
  },
  mounted() {
    const paper = store.state.paper;
    this.paperForm.title = paper.title;
    this.paperForm.classify = paper.classify;
    this.paperForm.paperScore = paper.paperScore;
    this.paperForm.user = paper.user;
    this.paperForm.during = [paper.startTime, paper.endTime];
  },
  methods: {
    submit() {
      this.$emit("submit", this.paperForm);
    },
  },
};
</script>

<style lang="less" scoped>
.paper-info-container {
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -2px -2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    flex: 1;
    padding: 20px;
  }
  .right {
    flex: 1;
    padding: 20px;
    .paper-type {
      color: #c1c1cb;
    }
    .form-row {
      margin-top: 22px;
      .title {
        color: #9090a4;
      }
      .content {
        margin-left: 10px;
        color: #666;
      }
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>

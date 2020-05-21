<template>
  <div class="paper-info-container">
    <div class="left">
      <el-form :model="paperForm" :ref="paperForm">
        <el-form-item label="考试名称">
          <el-input
            style="width: 60%"
            @input="handleChangeData('title', $event)"
            :value="paperForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试分类" prop="classify">
          <el-select
            @change="handleChangeData('classify', $event)"
            :value="paperForm.classify"
          >
            <el-option
              v-for="item in paperClassify"
              :value="item.classify"
              :key="item.value"
              :label="item.classify"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答题时间" prop="during">
          <el-date-picker
            :value="paperForm.during"
            @input="handleChangeData('during', $event)"
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
          <el-select
            multiple
            @change="handleChangeData('studentIdList', $event)"
            :value="paperForm.studentIdList"
          >
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
            <span class="title">题目数量：</span>
            <span class="content">{{ paperForm.questionList.length }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/helpers";
import { paperClassify } from "@/config/default";
export default {
  props: {
    paperInfo: {
      type: Object,
      default: () => {
        return {
          title: "",
          startTime: "",
          endTime: "",
          classify: "",
          paperScore: 0,
          studentIdList: [],
          user: {},
          questionList: [],
        };
      },
    },
    changeData: Function,
    handleSubmit: Function,
  },
  computed: {
    paperForm() {
      const paperForm = {
        title: this.paperInfo.title,
        during: [
          formatDate(this.paperInfo.startTime),
          formatDate(this.paperInfo.endTime),
        ],
        classify: this.paperInfo.classify,
        paperScore: this.paperInfo.paperScore,
        user: this.paperInfo.user,
        studentIdList: this.paperInfo.studentIdList,
        questionList: this.paperInfo.questionList,
      };
      return paperForm;
    },
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "未来一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来30天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
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
      paperClassify: paperClassify,
    };
  },
  methods: {
    submit() {
      this.handleSubmit();
    },
    handleChangeData(prop, e) {
      if (prop === "during") {
        this.changeData("startTime", formatDate(e[0]));
        this.changeData("endTime", formatDate(e[1]));
      } else {
        this.changeData(prop, e);
      }
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

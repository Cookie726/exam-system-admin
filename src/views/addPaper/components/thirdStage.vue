<template>
  <div class="third-container">
    <div class="left">
      <el-form v-model="paperForm" :ref="paperForm">
        <el-form-item label="考试名称" prop="title">
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
          <el-select multiple v-model="paperForm.students">
            <el-option value="2018010280" label="张三"></el-option>
            <el-option value="2018010281" label="李四"></el-option>
            <el-option value="2018010282" label="王五"></el-option>
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
            <div style="float: right">
              <el-button style=" padding: 3px 0" type="text">预览试卷</el-button
              ><el-divider
                style=" padding: 3px 0"
                direction="vertical"
              ></el-divider>
              <el-button style=" padding: 3px 0" type="text"
                >编辑试卷</el-button
              >
            </div>
          </div>
          <div class="form-row">
            <span class="title">总分：</span>
            <span class="content">10</span>
          </div>
          <div class="form-row">
            <span class="title">创建人：</span>
            <span class="content">东北师范大学蓝旭工作室</span>
          </div>
          <div class="form-row">
            <span class="title">试卷数量：</span> <span class="content">1</span>
          </div>
          <div class="form-row">
            <span class="title">创建时间：</span>
            <span class="content">2020-04-12 12:53:39</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "未来一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "未来一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "未来一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      paperForm: {}
    };
  },
  methods: {
    submit() {
      console.log(this.paperForm);
    }
  }
};
</script>

<style lang="less" scoped>
.third-container {
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

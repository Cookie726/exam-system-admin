<template>
  <div class="main-content">
    <div class="left">
      <div class="card">
        <p>总题数：0题</p>
        <p>当前总分：0分</p>
      </div>
    </div>
    <div class="right">
      <p class="title">
        <input type="text" placeholder="请输入试卷名称" :value="title" />
      </p>
      <div class="main-list">
        <div v-for="ques in list" :key="ques.id">
          <div class="content" v-html="ques.content">
            {{ ques.content }}
          </div>
          <div class="answer">
            
          </div>
        </div>
      </div>
      <div class="add-question center">
        <div class="create center">创建新的题目</div>
        <div class="select center">
          <el-button
            style="margin: 0"
            @click="showDialog = true"
            type="primary"
            plain
            >单选题</el-button
          >
          <el-button style="margin: 0" type="primary" plain>多选题</el-button>
          <el-button style="margin: 0" type="primary" plain>判断题</el-button>
          <el-button style="margin: 0" type="primary" plain>简答题</el-button>
        </div>
      </div>
    </div>
    <select-question
      @saveQuesList="handleSaveQues"
      :showDialog.sync="showDialog"
    ></select-question>
    <!-- <manual-addition :showDialog="showDialog"></manual-addition> -->
    <!-- <add-question :dialogAddQuestion="showDialog"></add-question> -->
  </div>
</template>

<script>
import SelectQuestion from "./selectQuestion";
// import AddQuestion from "./addQuestion";
export default {
  props: {
    title: {
      type: String,
      default: "测试",
    },
  },
  data() {
    return {
      showDialog: false,
      list: [
        {
          id: "10001",
          content: "<p>这是单选题题目</p>",
          analysis: "<p>这是单选题解析</p>",
          qtype: "单选题",
          key1: 0,
          answer1: "<p>asdf</p>",
          key2: 0,
          answer2: "<p>asdf</p>",
          key3: 1,
          answer3: "<p>asdf</p>",
          key4: 0,
          answer4: "<p>asdf</p>",
        },
        {
          id: "10002",
          content: "<p>这是多选题题目</p>",
          analysis: "<p>这是多选题解析</p>",
          qtype: "多选题",
          key1: 1,
          answer1: "<p>as否是否df</p>",
          key2: 0,
          answer2: "<p>asd讲话稿f</p>",
          key3: 1,
          answer3: "<p>染发asdf</p>",
          key4: 0,
          answer4: "<p>as发斯蒂芬df</p>",
        },
        {
          id: "10003",
          content: "<p>这是判断题题目</p>",
          analysis: "<p>这是判断题解析</p>",
          qtype: "判断题",
          key1: 1,
          answer1: "<p>正确</p>",
          key2: 0,
          answer2: "<p>错误</p>",
        },
        {
          id: "10004",
          content: "<p>这是简答题题目</p>",
          analysis: "<p>这是简答题解析</p>",
          qtype: "简答题",
          key1: 1,
          answer1: "<p>这是简答题答案</p>",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$emit("goBack", "first");
    },
    handleSaveQues(list) {
      console.log(list);
    },
  },
  components: {
    // "add-question": AddQuestion,
    "select-question": SelectQuestion,
  },
};
</script>

<style lang="less" scoped>
@bs: 2px 2px 2px rgba(0, 0, 0, 0.1), -2px -2px 2px rgba(0, 0, 0, 0.1);
@border: 1px solid #dedede;
.main-content {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  .left {
    width: 220px;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding-right: 20px;
    .card {
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: @bs;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    border-radius: 6px;
    box-shadow: @bs;
    .title {
      border-bottom: @border;
      margin: 25px 20px 20px 20px;
      padding-bottom: 9px;
      input {
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        font-size: 18px;
        color: #333;
        box-shadow: none;
        height: 34px;
        padding: 6px 12px;
        border-radius: 4px;
        border: none;
        outline: none;
      }
    }
    .main-list {
      margin: 25px 20px 20px 20px;
      border: @border;
      border-radius: 4px;
    }
    .add-question {
      margin: 25px 20px 20px 20px;
      border: @border;
      border-radius: 4px;
      height: 160px;
      position: relative;
      .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .select {
        display: none;
        width: 50%;
      }
      &:hover {
        cursor: pointer;
        .create {
          display: none;
        }
        .select {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          flex-direction: row;
        }
      }
    }
  }
}
</style>

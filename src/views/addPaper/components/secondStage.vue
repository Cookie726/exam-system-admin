<template>
  <div class="main-content">
    <el-backtop></el-backtop>
    <div class="left">
      <div class="card">
        <p>
          总题数：<span class="total-count">{{ formatList.length }}</span
          >题
        </p>
        <p>
          当前总分：<span class="total-score">{{
            formatList | getTotalScore
          }}</span
          >分
        </p>
      </div>
      <div class="card btn-group">
        <el-button plain icon="el-icon-view"
          ><span style="display: inline-block; width: 40px"
            >预 览</span
          ></el-button
        >
        <el-button
          @click="nextStage"
          plain
          style="margin-left: 0; margin-top: 12px"
          icon="el-icon-arrow-right"
          ><span style="display: inline-block; width: 40px"
            >下一步</span
          ></el-button
        >
      </div>
    </div>
    <div class="right">
      <p class="title">
        <input type="text" placeholder="请输入试卷名称" :value="title" />
      </p>
      <div class="main-list">
        <div
          class="question-item"
          :questionType="ques.qtype"
          v-for="(ques, i) in formatList"
          :key="ques.id"
        >
          <dl>
            <dt v-html="ques.content">{{ ques.content }}</dt>
            <dd
              :class="{ 'correct-answer': v.key === 1 }"
              v-for="(v, index) in ques.answer"
              :key="index"
            >
              <template v-if="ques.qtype === '判断题'">
                <em class="icon"
                  ><i
                    :class="{
                      'el-icon-check': index === 0,
                      'el-icon-close': index === 1,
                    }"
                  ></i></em
              ></template>
              <template v-else>
                <em class="icon">{{ index | numberToLetter }}</em>
              </template>
              <div v-html="v.answer">{{ v.answer }}</div>
            </dd>
          </dl>
          <div class="answer">
            <span class="desc">答案：</span>
            <span class="content" v-html="ques.correctAns">{{
              ques.correctAns
            }}</span>
          </div>
          <div class="analysis">
            <span class="desc">解析：</span>
            <span class="content" v-html="ques.analysis">{{
              ques.analysis
            }}</span>
          </div>
          <span class="m-example-score"
            >分数<input name="per_score" v-model.number="ques.score" />分</span
          >
          <span class="tool-group">
            <el-tooltip placement="top" content="编辑">
              <i class="el-icon-edit"></i>
            </el-tooltip>
            <el-tooltip placement="top" content="删除">
              <i @click="handleDelete(i)" class="el-icon-delete"></i>
            </el-tooltip>
            <el-tooltip placement="top" content="上移">
              <i @click="handleMoveUp(i)" class="el-icon-top"></i>
            </el-tooltip>
            <el-tooltip placement="top" content="下移">
              <i @click="handleMoveDown(i)" class="el-icon-bottom"></i>
            </el-tooltip>
          </span>
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
          content: "<p>撒<b>地方1</b></p>",
          analysis: "<p>这是单选题解析</p>",
          qtype: "单选题",
          answer: [
            { key: 0, answer: "<p>asdf</p>" },
            { key: 0, answer: "<p>asdf</p>" },
            { key: 1, answer: "<p>asdf</p>" },
            { key: 0, answer: "<p>asdf</p>" },
          ],
        },
        {
          id: "10002",
          content: "<p>这是多选题题目</p>",
          analysis: "<p>这是多选题解析</p>",
          qtype: "多选题",
          answer: [
            { key: 1, answer: "<p>asdf</p>" },
            { key: 0, answer: "<p>asdf</p>" },
            { key: 1, answer: "<p>asdf</p>" },
            { key: 0, answer: "<p>asdf</p>" },
          ],
        },
        {
          id: "10003",
          content: "<p>这是判断题题目</p>",
          analysis: "<p>这是判断题解析</p>",
          qtype: "判断题",
          answer: [
            { key: 1, answer: "正确" },
            { key: 0, answer: "错误" },
          ],
        },
        {
          id: "10004",
          content: "<p>这是简答题题目</p>",
          analysis: "<p>这是简答题解析</p>",
          qtype: "简答题",
          answer: [
            {
              key: 1,
              answer:
                "<p>这是简答题答案</p><p>这是简答题答案</p><p>这是简答题答案</p>",
            },
          ],
        },
      ],
    };
  },
  computed: {
    formatList() {
      const formatList = [];
      this.list.forEach((ques) => {
        let correctAns = "";
        if (ques.qtype === "单选题" || ques.qtype === "多选题") {
          ques.answer.forEach((v, i) => {
            correctAns += v.key === 1 ? String.fromCharCode(i + 65) : "";
          });
        } else if (ques.qtype === "判断题") {
          correctAns = ques.answer.filter((v) => v.key === 1)[0].answer;
        } else if (ques.qtype === "简答题") {
          correctAns = ques.answer[0].answer;
        }
        formatList.push(Object.assign({ correctAns, score: 0 }, ques));
      });
      return formatList;
    },
  },
  methods: {
    goBack() {
      this.$emit("goBack", "first");
    },
    handleSaveQues(list) {
      console.log(list);
    },
    handleDelete(i) {
      this.list.splice(i, 1);
    },
    handleMoveUp(i) {
      if (i === 0) {
        this.$message.error("无法上移");
      } else {
        [this.list[i], this.list[i - 1]] = [this.list[i - 1], this.list[i]];
        this.list = JSON.parse(JSON.stringify(this.list));
      }
    },
    handleMoveDown(i) {
      if (i === this.list.length - 1) {
        this.$message.error("无法下移");
      } else {
        [this.list[i + 1], this.list[i]] = [this.list[i], this.list[i + 1]];
        this.list = JSON.parse(JSON.stringify(this.list));
      }
    },
    nextStage() {
      // let pass = !this.formatList.some((ques) => ques.score <= 0);
      // if (!pass) {
      //   this.$message.error("请设置符合规范的题目分数");
      // } else {
      //   this.$emit("toThirdStage")
      // }

      this.$emit("toThirdStage");
    },
  },
  components: {
    // "add-question": AddQuestion,
    "select-question": SelectQuestion,
  },
};
</script>

<style lang="less" scoped>
.el-backtop {
  background-color: rgb(209, 209, 209);
}
@bs: 2px 2px 2px rgba(0, 0, 0, 0.1), -2px -2px 2px rgba(0, 0, 0, 0.1);
@border: 1px solid #dedede;
.main-content {
  background-color: #eef3f8;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  .left {
    width: 220px;
    height: 100%;
    box-sizing: border-box;
    padding-right: 20px;
    position: relative;
    .card {
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: @bs;
      width: 200px;
      position: fixed;
      &.btn-group {
        margin-top: 80px;
        text-align: center;
      }
      .total-count,
      .total-score {
        color: #1a8cfe;
        margin: 0 9px 0 5px;
        font-size: 16px;
      }
    }
  }
  .right {
    background-color: #fff;
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
dl {
  margin: 0 0 20px;
  dt {
    max-width: 50%;
    word-wrap: break-word;
    word-break: normal;
    color: #27274a;
    margin-bottom: 20px;
  }
  dd {
    max-width: 50%;
    position: relative;
    min-height: 20px;
    padding-left: 30px;
    margin-bottom: 21px;
    line-height: 26px;
    &.correct-answer {
      color: #1a8cfe;
      em {
        color: #fff !important;
        background-color: #1a8cfe !important;
        border-color: #1a8cfe !important;
      }
    }
    em {
      font-size: 15px;
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      position: absolute;
      left: 0;
      top: 2px;
      &.icon {
        border: 1px solid #c1c1cb;
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        display: inline;
        font-family: PingFangSC-Regular;
        border-radius: 2px;
        font-size: 14px;
        font-style: unset;
        color: #27274a;
      }
    }
  }
}
.question-item[questionType="单选题"],
.question-item[questionType="多选题"],
.question-item[questionType="判断题"] {
  dd {
    em {
      border-radius: 100%;
    }
  }
}
.answer,
.analysis {
  position: relative;
  margin-left: 40px;
  max-width: 100%;
  padding-right: 284px;
  margin-bottom: 10px;
  .desc {
    position: absolute;
    left: -40px;
  }
}
.question-item {
  padding-bottom: 10px;
  margin: 20px 30px 20px 30px;
  border-bottom: 1px #ebeef5 solid;
  border-radius: unset !important;
  position: relative;
  .m-example-score {
    position: absolute;
    right: 0;
    top: 58px;
    height: 28px;
    input {
      width: 56px;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      margin-right: 10px;
      height: 28px;
      margin-left: 10px;
      text-align: center;
      outline: none;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
      }
    }
  }
  .tool-group {
    position: absolute;
    right: 0;
    top: 20px;
    i {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>

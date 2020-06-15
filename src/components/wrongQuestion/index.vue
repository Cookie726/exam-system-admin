<template>
  <div class="question-container">
    <div class="question-content">
      <div class="questionType">{{ question.questionType }}</div>
      <div class="content" v-html="question.content"></div>
    </div>
    <div
      v-if="
        question.questionType === '多选题' ||
          question.questionType === '单选题' ||
          question.questionType === '判断题'
      "
      class="question-option mt-20"
    >
      <template v-for="(option, index) in question.optionList">
        <div
          class="option mb-12"
          :class="{
            right: option.status === 1,
            wrong:
              question.studentOptionList.some((op) => op.id === option.id) &&
              option.status === 0,
          }"
          :key="option.id"
        >
          <div class="index">{{ index | numberToLetter }}</div>
          <div class="choice" v-html="option.choice"></div>
        </div>
      </template>
    </div>
    <div class="analysis mt-20">
      <div class="mb-12">
        <div class="title">我的答案：</div>
        <div class="content" v-html="answer"></div>
      </div>
      <div class="mb-12">
        <div class="title">正确答案：</div>
        <div class="content" v-html="rightAnswer"></div>
      </div>
      <div class="mb-12">
        <div class="title">题目解析：</div>
        <div class="content" v-html="question.analysis"></div>
      </div>
      <div
        class="mb-12"
        v-if="question.questionType === '简答题' && question.filePath !== ''"
      >
        <div class="title">附件下载：</div>
        <div class="content">
          <el-button icon="el-icon-download" size="mini" type="success"
            >下载附件</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },
  methods: {
    getStudentAnswer() {
      let answer = "";
      if (this.question.questionType === "简答题") {
        answer = this.question.studentAnswer;
      } else if (this.question.questionType === "判断题") {
        answer = this.question.optionList.find((option) => {
          return option.id === this.question.studentOptionList[0].id;
        }).choice;
      } else if (this.question.questionType === "单选题") {
        answer = `
        <span  style="display: inline-block; text-align: center; line-height: 22px; width: 20px; height: 20px; border: 1px solid #333; border-radius: 50%;">${String.fromCharCode(
          this.question.optionList.findIndex((option) => {
            return option.id === this.question.studentOptionList[0].id;
          }) + 65
        )}</span>`;
      } else if (this.question.questionType === "多选题") {
        this.question.optionList.forEach((option, index) => {
          if (
            this.question.studentOptionList.some((op) => op.id === option.id)
          ) {
            answer += `<span style="display: inline-block; text-align: center; line-height: 22px; width: 20px; height: 20px; border: 1px solid #333; border-radius: 50%;">${String.fromCharCode(
              index + 65
            )}</span>`;
          }
        });
      }
      return answer;
    },
    getRightAnswer() {
      let rightAnswer = "";
      if (
        this.question.questionType === "简答题" ||
        this.question.questionType === "判断题"
      ) {
        rightAnswer = this.question.optionList.find(
          (option) => option.status === 1
        ).choice;
      } else if (
        this.question.questionType === "单选题" ||
        this.question.questionType === "多选题"
      ) {
        this.question.optionList.forEach((option, index) => {
          if (option.status === 1) {
            rightAnswer += `<span style="display: inline-block; text-align: center; line-height: 22px; width: 20px; height: 20px; border: 1px solid #333; border-radius: 50%;">${String.fromCharCode(
              index + 65
            )}</span>`;
          }
        });
      }
      return rightAnswer;
    },
  },
  computed: {
    answer() {
      return this.getStudentAnswer();
    },
    rightAnswer() {
      return this.getRightAnswer();
    },
  },
};
</script>

<style lang="less" scoped>
.question-container {
  border: 1px solid #c3c3c3;
  padding: 12px 12px 0;
  border-radius: 6px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 16px;
}
.question-content {
  position: relative;
  .questionType {
    padding: 6px 16px;
    background-color: #909399;
    color: #fff;
    border-radius: 4px;
    position: absolute;
  }
  .content {
    margin-left: 86px;
  }
}
.question-option {
  margin-left: 32px;
  position: relative;
  .option {
    &.wrong {
      border-color: red;
      .index {
        border-color: red;
        background-color: red;
        color: #fff;
      }
    }
    &.right {
      border-color: green;
      .index {
        border-color: green;
        background-color: green;
        color: #fff;
      }
    }
    .index {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 1px solid #333;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      box-sizing: border-box;
    }
    .choice {
      margin-left: 28px;
    }
  }
}
.analysis {
  margin-left: 32px;
  position: relative;
  .title {
    position: absolute;
  }
  .content {
    margin-left: 70px;
  }
}
.mb-12 {
  margin-bottom: 12px;
}
.mt-20 {
  margin-top: 20px;
}
</style>

<template>
  <div :id="question.id" class="question-content">
    <!-- 答题、预览：标记题目 -->
    <mark-flag
      v-if="pageName === 'examStart' || pageName === 'paperPreview'"
      :isMark.sync="isMark"
      :index="index"
    ></mark-flag>
    <!-- 批改：设置分数输入框 -->
    <set-score
      :questionId="question.id"
      :maxScore="question.value"
      v-if="pageName === 'markExam'"
    ></set-score>
    <!-- 题目 -->
    <div class="exam-question">
      <span class="question-index ellipsis">{{ index + 1 }}.</span>
      <div v-html="content">{{ content }}</div>
    </div>
    <!-- 选项 -->
    <div
      class="answers"
      v-if="pageName === 'examStart' || pageName === 'paperPreview'"
    >
      <template v-if="question.questionType !== '简答题'">
        <div
          class="select"
          :class="typeClass"
          :key="index"
          v-for="(option, index) in question.optionList"
        >
          <input
            :ref="'inputBtn' + index"
            :type="inputType"
            class="radioOrCheck hidden"
            :value="option.id"
            v-model="answer"
            :name="'keyChk_questions_' + question.id"
          />
          <label @click="handleSelect(index)">
            <span class="select-icon">
              <i class="icon el-icon-check"></i>
            </span>
            <span class="words"
              ><span
                class="words-option"
                v-if="question.questionType !== '判断题'"
                >{{ index | numberToLetter }}.
              </span>
              <span v-html="option.choice">G</span>
            </span>
          </label>
        </div>
      </template>
      <template v-else>
        <div class="editor-container">
          <editor
            @save="handleSave"
            :configMenus="configMenus"
            :value.sync="answer"
            :hasSaveBtn="true"
          ></editor>
        </div>
        <el-upload
          v-if="pageName === 'examStart' || pageName === 'paperPreview'"
          class="upload-demo"
          action="http://192.144.227.168:8086/upload/annex"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          name="annex"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >上传附件</el-button
          >
        </el-upload>
      </template>
    </div>
    <!-- 非答题题目面板 -->
    <div
      class="answers"
      v-if="pageName !== 'examStart' && pageName !== 'paperPreview'"
    >
      <template v-if="question.questionType !== '简答题'">
        <div
          class="select"
          :class="typeClass"
          :key="index"
          v-for="(option, index) in question.optionList"
        >
          <input
            :ref="'inputBtn' + index"
            :type="inputType"
            class="radioOrCheck hidden"
            :value="option.id"
            disabled
            :name="'keyChk_questions_' + question.id"
          />
          <label>
            <span class="select-icon">
              <i class="icon el-icon-check"></i>
            </span>
            <span class="words"
              ><span
                class="words-option"
                v-if="question.questionType !== '判断题'"
                >{{ index | numberToLetter }}.
              </span>
              <span v-html="option.choice"></span>
            </span>
          </label>
        </div>
      </template>
      <template v-else>
        <div class="editor-container">
          <div class="content" v-html="studentAnswer"></div>
        </div>
        <el-button
          @click="handleFileDownload"
          style="margin-top: 6px"
          size="mini"
          type="primary"
          icon="el-icon-download"
          >下载附件</el-button
        >
      </template>
      <!-- 解析及答案 -->
      <div class="analysis">
        <div class="analysis-row" v-if="pageName === 'recordDetail'">
          <div class="analysis-title">学员得分：</div>
          <div class="analysis-content question-com-answer error">
            {{ question.score }}
          </div>
        </div>
        <div class="analysis-row">
          <div class="analysis-title">学员答案：</div>
          <div
            class="analysis-content question-com-answer error"
            v-html="studentAnswer"
          ></div>
        </div>
        <div class="analysis-row">
          <div class="analysis-title">正确答案：</div>
          <div
            class="analysis-content question-ans-right"
            v-html="rightAnswer"
          ></div>
        </div>
        <div class="analysis-row">
          <div class="analysis-title">答案解析：</div>
          <div
            class="analysis-content question-analysis textalign-justify display-block"
            v-html="question.analysis"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isComplete } from "utils/helpers";
import { putAnswer } from "@/api/paperHome";
import editor from "@/components/editor";
import MarkFlag from "@/components/markFlag";
import SetScore from "@/components/setScore";
export default {
  props: {
    question: {
      default() {
        return {};
      },
      type: Object,
    },
    index: Number,
    paperId: Number,
    pageName: String,
    startTime: String,
    endTime: String,
  },
  data() {
    return {
      answer: [],
      configMenus: ["image", "table", "code"],
      isMark: false,
      fileList: [],
      annexPath: "",
    };
  },
  methods: {
    async handleSelect(index) {
      const ref = `inputBtn${index}`;
      this.$refs[ref][0].click();
      if (this.pageName === "examStart") {
        if (new Date() < new Date(this.startTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试还未开始不能答题",
          });
          return;
        } else if (new Date() > new Date(this.endTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试已经结束不能答题",
          });
          return;
        } else {
          const data = {
            paperId: this.paperId,
            questionId: this.question.id,
            optionIdList: Array.isArray(this.answer)
              ? this.answer
              : [this.answer],
          };
          try {
            const res = await putAnswer(data);
            if (res.code !== 0) {
              window.ELEMENT.Message.error(res.msg);
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      }
    },
    async handleSave() {
      if (this.pageName === "examStart") {
        if (new Date() < new Date(this.startTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试还未开始不能答题",
          });
          return;
        } else if (new Date() > new Date(this.endTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试已经结束不能答题",
          });
          return;
        } else {
          const data = {
            paperId: this.paperId,
            questionId: this.question.id,
            annexPath: this.annexPath,
            studentAnswer: this.answer,
          };
          try {
            const res = await putAnswer(data);
            if (res.code !== 0) {
              window.ELEMENT.Message.error(res.msg);
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response) {
      if (response.code === 0) {
        window.ELEMENT.Message.success("上传成功");
        this.annexPath = response.data;
      }
    },
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
    async handleFileDownload() {
      const { baseURL } = await import("@/utils/request");
      let a = document.createElement("a");
      a.style.display = "none";
      a.href = `${baseURL}/download?fileName=${this.question.filePath}`;
      a.setAttribute("download", "测试");
      document.body.appendChild(a);
      a.click(); //执行下载
      window.URL.revokeObjectURL(a.href); //释放url
      document.body.removeChild(a); //释放标签
    },
  },
  watch: {
    answer(newVal) {
      const _isComplete = isComplete(this.question.questionType, newVal);
      this.$store.commit("exercise/SET_DONE", {
        index: this.index,
        status: _isComplete,
      });
    },
    isMark(val) {
      this.$store.commit("exercise/SET_MARK", {
        index: this.index,
        status: val,
      });
    },
  },
  computed: {
    content() {
      // return `${this.question.content}(${this.question.score.toFixed(1)}分)`;
      return `${this.question.content}`;
    },
    typeClass() {
      let className;
      switch (this.question.questionType) {
        case "单选题":
          className = "single-select";
          break;
        case "多选题":
          className = "multi-select";
          break;
        case "判断题":
          className = "judge";
          break;
        default:
          break;
      }
      return className;
    },
    inputType() {
      let inputType;
      switch (this.question.questionType) {
        case "判断题":
        case "单选题":
          inputType = "radio";
          break;
        case "多选题":
          inputType = "checkbox";
          break;
        default:
          break;
      }
      return inputType;
    },
    studentAnswer() {
      if (this.pageName === "paperPreview" || this.pageName === "examStart") {
        return null;
      }
      return this.getStudentAnswer();
    },
    rightAnswer() {
      if (this.pageName === "paperPreview" || this.pageName === "examStart") {
        return null;
      }
      return this.getRightAnswer();
    },
  },
  components: {
    editor: editor,
    MarkFlag,
    SetScore,
  },
};
</script>

<style lang="less" scoped>
/deep/ .w-e-text-container {
  height: 300px !important;
}
/deep/ .text {
  min-height: 300px !important;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
.question-content {
  &:nth-child(n + 2) {
    border-top: 1px solid #dedede;
  }
  margin-bottom: 50px;
  padding: 30px 75px 0 30px;
  position: relative;
  .question-operation {
    width: 15px;
    height: 15px;
    font-size: 15px;
    position: absolute;
    top: 30px;
    right: -45px;
    cursor: pointer;
    color: #1a8cfe;
    &.icon-mark {
      color: #1a8cfe;
    }
    &.icon-marked {
      color: red;
    }
  }
  .exam-question {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
    .question-index {
      color: #1a8cfe;
      position: absolute;
      left: -25px;
      top: 0;
      display: inline-block;
      width: 40px;
      line-height: 22px;
      text-align: right;
    }
    .ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .answers {
    overflow: auto;
    .content {
      background: #ffffff;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      padding: 10px;
      min-height: 250px;
    }
    .words {
      position: relative;
      margin-left: 20px;
      display: block;
      .words-option {
        position: absolute;
        top: 0px;
        left: -20px;
        font-weight: 400;
      }
    }
  }
  .select {
    &.multi-select {
      label {
        .select-icon {
          border-radius: 2px !important;
        }
      }
    }
    .radioOrCheck:checked {
      & + label {
        .select-icon {
          border-color: #1a8cfe;
          background-color: #1a8cfe;
          .icon {
            display: inline-block;
          }
        }
      }
    }
    label {
      width: 100%;
      padding: 10px 15px 10px 45px;
      line-height: 20px;
      border-radius: 4px;
      &:hover {
        background: #fafafa;
        color: #1a8cfe;
      }
      cursor: pointer;
      margin: 0;
      position: relative;
      min-height: 40px;
      .select-icon {
        font-size: 15px;
        position: absolute;
        left: 15px;
        top: 12.5px;
        border: 1px solid #979797;
        background: #fff;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        .icon {
          display: none;
          position: absolute;
          top: -1px;
          left: -1px;
          font-weight: 600;
          color: #fff;
        }
      }
    }
  }
  .analysis {
    background: rgba(222, 222, 222, 0.2);
    border-radius: 4px;
    padding: 15px 20px;
    line-height: 24px;
    margin-top: 10px;
    position: relative;
    .analysis-row {
      min-height: 24px;
      padding-left: 70px;
      padding-right: 60px;
      position: relative;
      .analysis-title {
        position: absolute;
        width: 70px;
        left: 0;
        top: 0;
      }
    }
    .analysis-content {
      word-wrap: break-word;
    }
  }
  .display-block {
    display: block !important;
  }
  .textalign-justify {
    text-align: justify;
  }
}
</style>

<template>
  <div class="manual-container">
    <div class="top">
      <span style="margin-right: 12px">题目类型</span>
      <el-select v-model="type">
        <el-option
          v-for="item in questionType"
          :label="item.type"
          :key="item.index"
          :value="item.type"
        ></el-option>
      </el-select>

      <span style="margin-right: 12px; margin-left: 12px;">类别</span>
      <el-select v-model="classify">
        <el-option
          v-for="item in paperClassify"
          :label="item.classify"
          :key="item.value"
          :value="item.classify"
        ></el-option>
      </el-select>
    </div>
    <div class="question-content">
      <div class="desc-panel">
        <div class="title">
          <span class="tip">题干</span>
          <span class="intro">这里写题目描述</span>
        </div>
        <div class="editor-container" @click="updateActive('desc-panel')">
          <editor
            :value.sync="content"
            :class="{ active: active === 'desc-panel' }"
          ></editor>
        </div>
      </div>
      <div v-if="type === '单选题'" class="key-panel">
        <div class="title">
          <span class="tip">选项</span>
          <span class="intro">选项个数不能少于两个</span>
        </div>
        <div v-for="(item, index) in answerList" :key="index" class="key-list">
          <div class="key-left">
            <input
              :value="index"
              type="radio"
              class="radioOrCheck"
              name="keyChk"
              v-model="radio"
            />
          </div>
          <div class="key-right">
            <div
              class="editor-container"
              @click="updateActive(`answer${index + 1}`)"
            >
              <editor
                :value.sync="item.choice"
                :class="{ active: active === `answer${index + 1}` }"
              ></editor>
            </div>
          </div>
          <div @click="removeOption(index)" class="remove-key" v-if="index > 1">
            <svg-icon icon-class="remove"></svg-icon>
          </div>
        </div>
        <div class="addKeyBtn">
          <button
            @click="addOption"
            type="button"
            class="btn btn-l-gray addKey"
          >
            <i class="plus-style icons8-plus"></i>添加一个选项
          </button>
        </div>
      </div>
      <div v-if="type === '多选题'" class="key-panel">
        <div class="title">
          <span class="tip">选项</span>
          <span class="intro">选项个数不能少于两个</span>
        </div>
        <div v-for="(item, index) in answerList" :key="index" class="key-list">
          <div class="key-left">
            <input
              type="checkbox"
              class="radioOrCheck"
              name="keyChk"
              :value="index"
              v-model="chks"
            />
          </div>
          <div class="key-right">
            <div
              class="editor-container"
              @click="updateActive(`answer${index + 1}`)"
            >
              <editor
                :value.sync="item.choice"
                :class="{ active: active === `answer${index + 1}` }"
              ></editor>
            </div>
          </div>
          <div @click="removeOption(index)" class="remove-key" v-if="index > 1">
            <svg-icon icon-class="remove"></svg-icon>
          </div>
        </div>
        <div class="addKeyBtn">
          <button
            @click="addOption"
            type="button"
            class="btn btn-l-gray addKey"
          >
            <i class="plus-style icons8-plus"></i>添加一个选项
          </button>
        </div>
      </div>
      <div class="key-judge key-panel" v-if="type === '判断题'">
        <div class="title">
          <span class="tip">选项</span>
          <span class="intro">选择正确或者错误（默认正确）</span>
        </div>
        <div class="button-box">
          <input
            type="radio"
            class="hidden"
            :value="0"
            name="keyChk"
            id="judgeYes"
            v-model="radio"
          />
          <label for="judgeYes" class="btn btn-border-gray">正确</label>
          <input
            type="radio"
            class="hidden"
            name="keyChk"
            :value="1"
            id="judgeNo"
            v-model="radio"
          />
          <label for="judgeNo" class="btn btn-border-gray">错误</label>
        </div>
      </div>
      <div class="key-cloze key-panel" v-if="type === '简答题'">
        <div class="title">
          <span class="tip">解析</span>
          <span class="intro">这里填写该问题对应的答案解释</span>
        </div>
        <div class="editor-container" @click="updateActive('cloze-panel')">
          <editor
            :value.sync="answerList[0].choice"
            :class="{ active: active === 'cloze-panel' }"
          ></editor>
        </div>
      </div>
      <div class="analysis-panel">
        <div class="title">
          <span class="tip">解析</span>
          <span class="intro">这里填写该问题对应的答案解释</span>
        </div>
        <div class="editor-container" @click="updateActive('analysis-panel')">
          <editor
            :value.sync="analysis"
            :class="{ active: active === 'analysis-panel' }"
          ></editor>
        </div>
      </div>
    </div>
    <span class="bottom-btn">
      <el-button @click="handleAddQuestion" type="primary">导 入</el-button>
    </span>
  </div>
</template>

<script>
import { questionType, paperClassify } from "@/config/default";
import editor from "@/components/editor";
import { isSetAnswer } from "@/utils/validate";
export default {
  data() {
    return {
      radio: null,
      chks: [],
      questionType: questionType,
      paperClassify: paperClassify,
      type: "单选题",
      classify: "",
      showEditor: false,
      active: "",
      content: "",
      analysis: "",
      answerList: [
        {
          status: 0,
          choice: "",
        },
        {
          status: 0,
          choice: "",
        },
        {
          status: 0,
          choice: "",
        },
        {
          status: 0,
          choice: "",
        },
      ],
    };
  },
  watch: {
    type(newVal) {
      this.content = "";
      this.analysis = "";
      this.chks = [];
      this.radio = null;
      switch (newVal) {
        case "单选题":
          this.answerList = [
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
          ];
          break;
        case "多选题":
          this.answerList = [
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
            {
              status: 0,
              choice: "",
            },
          ];
          break;
        case "判断题":
          this.radio = 0;
          this.answerList = [
            {
              status: 1,
              choice: "正确",
            },
            {
              status: 0,
              choice: "错误",
            },
          ];
          break;
        case "简答题":
          this.answerList = [
            {
              status: 1,
              choice: "",
            },
          ];
          break;
        default:
          break;
      }
    },
    radio(newVal, oldVal) {
      if (oldVal !== null) {
        if (oldVal + 1 <= this.answerList.length) {
          this.answerList[oldVal].status = 0;
        }
      }
      if (newVal !== null) {
        if (newVal + 1 <= this.answerList.length) {
          this.answerList[newVal].status = 1;
        }
      }
    },
    chks(newVal, oldVal) {
      if (oldVal.length !== 0) {
        oldVal.forEach((v) => {
          this.answerList[v].status = 0;
        });
      }
      if (newVal.length !== 0) {
        newVal.forEach((v) => {
          this.answerList[v].status = 1;
        });
      }
    },
  },
  methods: {
    updateActive(new_active) {
      this.active = new_active;
    },
    addOption() {
      this.answerList.push({ status: 0, choice: "" });
    },
    removeOption(index) {
      this.answerList.splice(index, 1);
      this.radio = null;
      this.chks = [];
    },
    validateQuestion() {
      if (!this.classify) {
        this.$message.warning("请选择题目类别");
        return false;
      } else if (!isSetAnswer(this.answerList)) {
        this.$message.warning("请设置答案");
        return false;
      } else if (!this.type) {
        this.$message.warning("请选择题目类型");
        return false;
      }
      return true;
    },
    handleAddQuestion() {
      setTimeout(() => {
        if (!this.validateQuestion()) return;
        let optionList = [];
        this.answerList.forEach((ans) => {
          const option = {
            choice: ans.choice,
            status: ans.status,
          };
          optionList.push(option);
        });
        const param = {
          questionType: this.type,
          content: this.content,
          analysis: this.analysis,
          optionList,
          classify: this.classify,
        };
        console.log(param);
      }, 0);
    },
  },
  components: {
    editor: editor,
  },
};
</script>
<style lang="less">
.editor {
  .toolbar {
    display: none;
  }
  .text {
    height: 85px;
  }
}
.key-panel {
  .key-list {
    .editor {
      .text {
        height: 35px;
      }
    }
  }
}
.editor.active {
  .toolbar {
    display: flex;
  }
  .w-e-text-container {
    height: 200px !important;
  }
}
</style>
<style lang="less" scoped>
.manual-container {
  .top {
    margin-bottom: 18px;
  }
  .bottom-btn {
    z-index: 100;
    position: fixed;
    left: 0;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    bottom: 0;
  }
}
input[type="checkbox"],
input[type="radio"] {
  width: 15px;
  height: 15px;
}
input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}
.btn {
  font-size: 12px;
  line-height: 1;
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  line-height: 1.42857143;
  border-radius: 4px;
  user-select: none;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
.button-box {
  width: 95.5%;
  margin-left: 52px;
}
.remove-key {
  width: 14px;
  height: 14px;
  right: -24px;
  z-index: 10;
  position: absolute;
  top: 50%;
  margin-top: -9px;
  cursor: pointer;
  text-align: center;
  line-height: 18px;
  color: #fff;
}
.editor-container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1;
  position: relative;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;
  width: 100%;
}
.desc-panel,
.key-panel,
.analysis-panel,
.key-cloze {
  margin-bottom: 40px;
  .title {
    .tip {
      font-size: 12px;
      margin-right: 12px;
      color: rgb(255, 255, 255);
      display: inline-block;
      padding: 5px 14px;
      background: rgb(169, 179, 191);
    }
    .intro {
      color: rgb(169, 179, 191);
      vertical-align: middle;
    }
  }
}
.question-content {
  background-color: rgb(246, 247, 250);
  padding: 20px 48px 20px 20px;
  .desc-panel,
  .analysis-panel,
  .key-cloze {
    .editor-container {
      margin-top: 15px;
      border: 1px solid #c2cedb;
      border-radius: 2px;
      min-height: 62px;
      margin-left: 55px;
      width: 95%;
      .editor-txt {
        background-color: #fff;
        padding: 15px 20px 20px 20px;
        height: 58px !important;
        margin: 0px !important;
        box-sizing: border-box;
      }
    }
  }
  .key-panel {
    .key-list {
      margin-bottom: 15px;
      position: relative;
      margin-top: 15px;
      .key-left {
        display: inline-block;
        width: 46px;
        text-align: center;
      }
      .key-right {
        width: calc(100% - 50px);
        vertical-align: middle;
        display: inline-block;
        .editor-container {
          min-height: 30px;
          vertical-align: middle;
          border-radius: 2px;
          background-color: #fff;
        }
      }
    }
    .addKeyBtn {
      margin-top: 15px;
      .addKey {
        background: #a9b3bf;
        border-radius: 4px;
        color: #fff;
        padding: 10px 0;
        margin-left: 48px;
        width: calc(100% - 48px);
        border: none;
        outline: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
.key-judge {
  input[type="radio"]:checked + label {
    background: #a9b3bf;
    border: 1px solid #878f98;
    color: #fff;
  }
  label {
    color: #777e87;
    margin-right: 6px;
    border: 1px solid #abbcd0;
    padding: 10px 37px;
  }
}
</style>

<template>
  <div :id="question.id" class="question-content">
    <el-tooltip effect="dark" :content="tipContent" placement="top">
      <div
        @click="handleMark"
        class="question-operation operation-icon"
        :class="{ 'icon-marked': isMark, 'icon-mark': !isMark }"
      >
        <i class="icon el-icon-s-flag"></i>
      </div>
    </el-tooltip>
    <div class="exam-question">
      <span class="question-index ellipsis">{{ index + 1 }}.</span>
      <div v-html="content">{{ content }}</div>
    </div>
    <div class="answers">
      <template v-if="question.type !== '简答题'">
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
            :value="'key' + (index + 1)"
            v-model="answer"
            name="keyChk_questions_5e94993d57aad24951289727_1"
          />
          <label @click="handleSelect(index)">
            <span class="select-icon">
              <i class="icon el-icon-check"></i>
            </span>
            <span class="words"
              ><span class="words-option" v-if="question.type !== '判断题'"
                >{{ index | numberToLetter }}.
              </span>
              <span v-html="option.answer"> {{ option.answer }}</span>
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
      </template>
    </div>
  </div>
</template>

<script>
import { initAnswerType, isComplete } from "utils/helpers";
import editor from "@/components/editor";
export default {
  props: {
    question: {
      default() {
        return {
          type: "简答题",
          content: "<p>撒<b>地方1</b></p><p>撒地方<i>双方的给</i> 非观</p>",
          score: 10,
          optionList: [
            {
              answer: "正确",
            },
            {
              answer: "错误",
            },
          ],
        };
      },
      type: Object,
    },
    index: Number,
  },
  data() {
    return {
      answer: null,
      configMenus: [
        "image", // 插入图片
        "table", // 表格
        "code",
      ],
      isMark: false,
    };
  },
  mounted() {
    this.answer = initAnswerType(this.question.type);
  },
  methods: {
    handleMark() {
      this.isMark = !this.isMark;
      this.$store.commit("exercise/SET_MARK", {
        index: this.index,
        status: this.isMark,
      });
    },
    handleSelect(index) {
      const ref = `inputBtn${index}`;
      this.$refs[ref][0].click();
    },
    handleSave() {
      console.log("save", this.answer);
    },
  },
  watch: {
    answer(newVal) {
      const _isComplete = isComplete(this.question.type, newVal);
      this.$store.commit("exercise/SET_DONE", {
        index: this.index,
        status: _isComplete,
      });
    },
  },
  computed: {
    content() {
      return `${this.question.content}(${this.question.score.toFixed(1)}分)`;
    },
    typeClass() {
      let className;
      switch (this.question.type) {
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
      switch (this.question.type) {
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
    tipContent() {
      return this.isMark ? "取消标记" : "标记本题";
    },
  },
  components: {
    editor: editor,
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
}
</style>

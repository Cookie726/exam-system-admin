<template>
  <div>
    <div class="top">
      <span>题目类型</span>
      <el-select v-model="questionInfo.type">
        <el-option
          v-for="item in questionType"
          :label="item.type"
          :key="item.index"
          :value="item.type"
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
          <editor :class="{ active: active === 'desc-panel' }"></editor>
        </div>
        <input name="question" type="hidden" value="<p><br></p>" />
      </div>
      <div class="key-panel">
        <div class="title">
          <span class="tip">选项</span>
          <span class="intro">选项个数不能少于两个</span>
        </div>
        <div class="key-list">
          <div class="key-left">
            <input type="radio" class="radioOrCheck" name="keyChk" value="" />
          </div>
          <div class="key-right">
            <div class="editor-container">
              <editor></editor>
            </div>
            <input type="hidden" value="<p><br></p>" />
          </div>
        </div>
        <div class="key-list">
          <div class="key-left">
            <input type="radio" class="radioOrCheck" name="keyChk" value="" />
          </div>
          <div class="key-right">
            <div class="editor-container">
              <editor></editor>
            </div>
            <input type="hidden" value="<p><br></p>" />
          </div>
        </div>
        <div class="key-list">
          <div class="key-left">
            <input type="radio" class="radioOrCheck" name="keyChk" value="" />
          </div>
          <div class="key-right">
            <div class="editor-container">
              <editor></editor>
            </div>
            <input type="hidden" value="<p><br></p>" />
          </div>
        </div>
        <div class="key-list">
          <div class="key-left">
            <input type="radio" class="radioOrCheck" name="keyChk" value="" />
          </div>
          <div class="key-right">
            <div class="editor-container">
              <editor></editor>
            </div>
            <input type="hidden" value="<p><br></p>" />
          </div>
        </div>
        <div class="addKeyBtn">
          <button type="button" class="btn btn-l-gray addKey">
            <i class="plus-style icons8-plus"></i>添加一个选项
          </button>
        </div>
      </div>
      <div class="analysis-panel">
        <div class="title">
          <span class="tip">解析</span>
          <span class="intro">这里填写该问题对应的答案解释</span>
        </div>
        <div class="editor-container" @click="updateActive('analysis-panel')">
          <editor :class="{active: active === 'analysis-panel'}"></editor>
        </div>
        <input name="analysis" type="hidden" />
      </div>
    </div>
  </div>
</template>

<script>
import { questionType } from "../../../config/default";
import editor from "../../../components/editor";
export default {
  data() {
    return {
      questionType: questionType,
      questionInfo: {
        type: "单选题"
      },
      showEditor: false,
      active: ""
    };
  },
  methods: {
    updateActive(new_active) {
      this.active = new_active;
    }
  },
  components: {
    editor: editor
  }
};
</script>
<style lang="less" scoped>
input[type="checkbox"],
input[type="radio"] {
  width: 15px;
  height: 15px;
}
.editor {
  display: none;
}
.editor.active {
  display: block;
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
.analysis-panel {
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
  .analysis-panel {
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
</style>

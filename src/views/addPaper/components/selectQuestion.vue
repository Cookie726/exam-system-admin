<template>
  <transition name="fade">
    <div class="modal" v-show="showDialog">
      <div class="main-container">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">选择试题</h4>
            <span class="add-quest"
              ><el-button
                icon="el-icon-circle-plus-outline"
                @click="handleAddQuestion"
                type="text"
                >添加试题</el-button
              ></span
            >
          </div>
          <div class="modal-body">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="试题列表" name="first">
                <el-table
                  ref="questionListTable"
                  @select="handleSelectionChange"
                  @select-all="handleSelectAll"
                  :data="tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column align="center" type="selection" width="80">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="content"
                    label="题干"
                    min-width="320"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="questionType"
                    label="题型"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="user.userName"
                    label="创建人"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="createTime"
                    label="创建时间"
                    width="180"
                  >
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageConfig.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageConfig.limit"
                    layout="total, sizes, prev, pager, next"
                    :total="400"
                  >
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已选试题" name="second">
                <el-table :data="list" border style="width: 100%">
                  <el-table-column
                    align="center"
                    prop="content"
                    label="题干"
                    min-width="320"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="questionType"
                    label="题型"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="user.userName"
                    label="创建人"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="createTime"
                    label="创建时间"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop=""
                    label="操作"
                    width="180"
                    ><template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="handleRemove(scope.row.id)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
            <div class="modal-btn-group">
              <el-button @click="handleClose">关闭</el-button>
              <el-button @click="save" type="primary">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    questionType: String,
    handleShowAddQuestion: Function,
  },
  mounted() {
    console.log(this.questionType);
  },
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          id: "10001",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10006",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10007",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10008",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10009",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10010",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10011",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10012",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10013",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10014",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10015",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
        {
          id: "10016",
          content: "123123",
          questionType: "单选题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            { status: 1, choice: "正确" },
            { status: 0, choice: "错误" },
          ],
        },
      ],
      pageConfig: {
        limit: 10,
        page: 1,
      },
      selectQuesList: [],
      list: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageConfig.limit = val;
    },
    handleCurrentChange(val) {
      this.pageConfig.page = val;
    },
    handleSelectionChange(_, a) {
      const index = this.selectQuesList.indexOf(a);
      if (index === -1) {
        this.selectQuesList[this.selectQuesList.length] = a;
      } else {
        for (let i = index; i < this.selectQuesList.length - 1; i++) {
          this.selectQuesList[i] = this.selectQuesList[i + 1];
        }
        this.selectQuesList.length--;
      }
      this.list = JSON.parse(JSON.stringify(this.selectQuesList));
    },
    handleSelectAll(val) {
      if (val.length === 0) {
        this.selectQuesList.length = 0;
      } else {
        val.forEach((v, i) => {
          this.selectQuesList[i] = v;
        });
      }
      this.list = this.selectQuesList;
    },
    handleRemove(id) {
      this.list = this.list.filter((_v) => _v.id !== id);
      this.selectQuesList = this.selectQuesList.filter((_v) => _v.id !== id);
    },
    handleClose() {
      this.$emit("update:showDialog", false);
    },
    save() {
      this.$emit("saveQuesList", JSON.parse(JSON.stringify(this.list)));
      this.handleClose();
    },
    handleAddQuestion() {
      this.handleShowAddQuestion();
      this.handleClose();
    },
  },
  watch: {
    selectQuesList(newVal, oldVal) {
      console.log("changed", newVal);
      const diffArr = newVal.concat(oldVal).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
      this.$refs.questionListTable.toggleRowSelection(diffArr[0]);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .is-indeterminate.el-checkbox__input .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
/deep/ .el-checkbox__input {
  .el-checkbox__inner {
    background-color: rgba(58, 62, 81, 0.3);
    border-color: rgba(58, 62, 81, 0.3);
    width: 20px;
    height: 20px;
    &:hover {
      background-color: #409eff;
      border-color: #409eff;
    }
    &::after {
      transform: translate(-50%, -50%);
      box-sizing: content-box;
      content: "";
      background-color: #fff;
      height: 12px;
      left: 50%;
      width: 1px;
      top: 50%;
      position: absolute;
    }
    &::before {
      transform: translate(-50%, -50%);
      box-sizing: content-box;
      content: "";
      background-color: #fff;
      height: 2px;
      width: 12px;
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
  &.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }
}
/deep/ .is-checked {
  .el-checkbox__inner::after {
    display: none;
  }
}
.block {
  text-align: center;
  margin-top: 20px;
}
.modal {
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  z-index: 2000;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0;
  top: 0;
  .main-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1070px;
    border-radius: 4px;
    height: 80%;
    .modal-content {
      overflow: auto;
      padding: 0 40px 0 40px;
      height: 100%;
      position: relative;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      background-clip: padding-box;
      outline: 0;
      .modal-header {
        position: fixed;
        z-index: 100;
        background-color: #fff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: 100%;
        left: 0;
        height: 54px;
        line-height: 54px;
        border-bottom: 0;
        .modal-title {
          font-size: 22px;
          color: #333;
          text-align: center;
        }
        .add-quest {
          position: absolute;
          top: 0;
          right: 40px;
          font-size: 14px;
          color: #1a8cfe;
          cursor: pointer;
        }
      }
      .modal-body {
        padding: 54px 0 70px;
        .modal-btn-group {
          position: fixed;
          height: 60px;
          line-height: 60px;
          bottom: 0;
          width: 100%;
          text-align: center;
          background-color: #fff;
          z-index: 100;
          left: 0;
          border-bottom-right-radius: 6px;
          border-bottom-left-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-top-color: transparent;
        }
      }
    }
  }
}
</style>

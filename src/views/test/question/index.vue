<template>
  <div class="question-container">
    <add-question
      :handleCloseAddQuestion="handleCloseAddQuestion"
      :dialogAddQuestion="dialogAddQuestion"
    ></add-question>
    <div>
      <el-form :inline="true" :model="pageConfig" class="demo-form-inline">
        <el-form-item label="题目">
          <el-input
            v-model="pageConfig.content"
            placeholder="请输入题目"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="pageConfig.classify" placeholder="请选择题目分类">
            <el-option
              v-for="item in paperClassify"
              :key="item.value"
              :label="item.classify"
              :value="item.classify"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目类型">
          <el-select
            v-model="pageConfig.questionType"
            placeholder="请选择题目类型"
          >
            <el-option
              v-for="item in questionType"
              :key="item.index"
              :label="item.type"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button @click="handleAddQuestion">添加试题</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        align="center"
        prop="content"
        label="题干"
        min-width="320"
      >
        <template slot-scope="scope">
          {{ scope.row.content | getText }}
        </template>
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
        fixed="right"
        label="操作"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            @click="handleDelete(scope.row.id)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageConfig.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageConfig.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="题目信息" :visible.sync="showQuestionDetail">
      <question-detail :question="quesDetail"></question-detail>
    </el-dialog>
  </div>
</template>

<script>
import { questionType, paperClassify } from "@/config/default";
import {
  getQuestionList,
  getQuestionDetail,
  deleteQuestion,
} from "@/api/paperQuestionManage";
import AddQuestion from "@/components/addQuestion";
import QuestionDetail from "@/components/questionDetail";
export default {
  methods: {
    async handleClick(id) {
      const loading = this.$loading({
        lock: true,
        text: "拼命获取中···",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await getQuestionDetail(id);
        if (res.code === 0) {
          this.quesDetail = res.data;
          this.showQuestionDetail = true;
        } else {
          throw new Error(res.msg);
        }
      } catch (e) {
        throw new Error(e);
      } finally {
        loading.close();
      }
    },
    handleSizeChange(pageSize) {
      this.pageConfig.pageSize = pageSize;
      this.setData();
    },
    handleCurrentChange(currentPage) {
      this.pageConfig.currentPage = currentPage;
      this.setData();
    },
    handleAddQuestion() {
      this.dialogAddQuestion = true;
    },
    handleCloseAddQuestion() {
      this.dialogAddQuestion = false;
    },
    resetForm() {
      this.pageConfig.classify = "";
      this.pageConfig.questionType = "";
      this.pageConfig.content = "";
      this.setData()
    },
    handleSearch() {
      if (
        !(
          this.pageConfig.content ||
          this.pageConfig.classify ||
          this.pageConfig.questionType
        )
      ) {
        window.ELEMENT.Message.warning("查询条件不能为空");
        return;
      }
      this.setData();
    },
    handleDelete(id) {
      window.ELEMENT.MessageBox.confirm("是否删除改题目？").then(() => {
        deleteQuestion(id)
          .then((res) => {
            if (res.code === 0) {
              window.ELEMENT.Message.success("删除成功");
              this.setData();
            } else {
              window.ELEMENT.Message.error(res.msg);
            }
          })
          .catch((e) => {
            throw new Error(e);
          });
      });
    },
    setData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      getQuestionList(this.pageConfig)
        .then((res) => {
          loading.close();
          if (res.code === 0) {
            this.total = res.data.total;
            this.tableData = res.data.questionList;
          } else {
            throw new Error(res.msg);
          }
        })
        .catch((e) => {
          loading.close();
          throw new Error(e);
        });
    },
  },
  mounted() {
    this.setData();
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          content: "123123",
          questionType: "选择题",
          user: {
            userName: "潘炳名",
          },
          createTime: "2020/04/14 22:18:22",
        },
      ],
      pageConfig: {
        limit: 10,
        currentPage: 1,
        content: "",
        classify: "",
        questionType: "",
      },
      dialogAddQuestion: false,
      paperClassify,
      questionType,
      showQuestionDetail: false,
      quesDetail: {
        content: "<p>这是题目</p>",
        questionType: "简答题",
        classify: "前端",
        createTime: "2020-05-21 18:05:23",
        user: {
          userName: "潘炳名",
        },
        analysis: "<p>这是解析</p>",
        value: 10,
        optionList: [
          {
            status: 1,
            choice: "<p>这是第一个选项</p>",
          },
        ],
      },
      total: 0,
    };
  },

  components: {
    AddQuestion,
    QuestionDetail,
  },
};
</script>

<style lang="less" scoped>
.btn-group {
  margin-bottom: 20px;
}
.block {
  text-align: center;
  margin-top: 20px;
}
</style>

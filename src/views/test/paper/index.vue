<template>
  <div>
    <div>
      <el-form :inline="true" :model="pageConfig" class="demo-form-inline">
        <el-form-item label="试卷标题">
          <el-input
            v-model="pageConfig.title"
            placeholder="请输入试卷标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="试卷分类">
          <el-select v-model="pageConfig.classify" placeholder="请选择试卷分类">
            <el-option
              v-for="item in paperClassify"
              :key="item.value"
              :label="item.classify"
              :value="item.classify"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 20px">
      <el-button @click="handleAddPaper">添加试卷</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="试卷标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.classify }}</span>
            </el-form-item>
            <el-form-item label="限制答题时间(秒)">
              <span>{{ props.row.timeLimit }}</span>
            </el-form-item>
            <el-form-item label="总分">
              <span>{{ props.row.paperScore }}</span>
            </el-form-item>
            <el-form-item label="出题人">
              <span>{{ props.row.user.userName }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="截止时间">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="试卷标题"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="classify"
        label="分类"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="timeLimit"
        label="限制答题时间(秒)"
        min-width="140"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="endTime"
        label="截止时间"
        min-width="180"
      >
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip content="预览" placement="top">
            <el-button
              @click="handleView(scope.row.id)"
              type="text"
              icon="el-icon-view"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="批改" placement="top">
            <el-button
              @click="
                showSubmitList = true;
                currentPaperId = scope.row.id;
              "
              type="text"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="提交列表" placement="top">
            <el-button
              @click="
                showSubmitList = true;
                currentPaperId = scope.row.id;
              "
              type="text"
              icon="el-icon-s-data"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="成绩分析" placement="top">
            <el-button
              @click="
                showMark = true;
                currentPaperId = scope.row.id;
              "
              type="text"
              icon="el-icon-data-analysis"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="修改" placement="top">
            <el-button
              @click="handleEdit(scope.row.id)"
              type="text"
              icon="el-icon-edit-outline"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              @click="handleDelete(scope.row.id)"
              type="text"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>
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
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <submit-list
      :paperId="currentPaperId"
      :dialogTableVisible.sync="showSubmitList"
    ></submit-list>
    <mark-dialog
      :paperId="currentPaperId"
      :showMarkDialog.sync="showMark"
    ></mark-dialog>
    <paper-info-dialog
      :changeData="changeData"
      :paperInfo="paperInfo"
      :showPaperInfoDialog.sync="showPaperInfoDialog"
    ></paper-info-dialog>
  </div>
</template>

<script>
import SubmitList from "@/components/submitList";
import MarkDialog from "@/components/markDialog";
import PaperInfoDialog from "@/components/paperInfoDialog";
import { paperClassify } from "@/config/default";
import {
  getPaperList,
  getPaperDetail,
  deletePaper,
} from "@/api/paperQuestionManage";
export default {
  methods: {
    handleView(id) {
      let routeData = this.$router.resolve({
        name: "paperPreview",
        params: {
          id,
        },
      });
      window.open(routeData.href, "view_window");
    },
    handleSizeChange(pageSize) {
      this.pageConfig.pageSize = pageSize;
      this.setData();
    },
    handleCurrentChange(currentPage) {
      this.pageConfig.currentPage = currentPage;
      this.setData();
    },
    handleEdit(paperId) {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中···",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      getPaperDetail(paperId)
        .then((res) => {
          loading.close();
          if (res.code === 0) {
            console.log(res);
            this.paperInfo = res.data.paperInfo;
            this.paperInfo.questionList = res.data.questionList;
            this.paperInfo.studentIdList = [];
          } else {
            throw new Error(res.msg);
          }
          this.showPaperInfoDialog = true;
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    resetForm() {
      this.pageConfig.classify = "";
      this.pageConfig.title = "";
      this.setData();
    },
    handleSearch() {
      if (!(this.pageConfig.classify || this.pageConfig.title)) {
        window.ELEMENT.Message.warning("查询条件不能为空");
        return;
      } else {
        this.setData();
      }
    },
    changeData(prop, e) {
      console.log(prop, e);
      this.paperInfo[prop] = e;
      this.$forceUpdate();
    },
    handleAddPaper() {
      this.$router.push("/addPaper");
    },
    handleDelete(id) {
      window.ELEMENT.MessageBox.confirm("是否删除改题目？").then(() => {
        deletePaper(id)
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
      getPaperList(this.pageConfig)
        .then((res) => {
          loading.close();
          if (res.code === 0) {
            this.total = res.data.total;
            this.tableData = res.data.paperList;
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
      showPaperInfoDialog: false,
      showSubmitList: false,
      showMark: false,
      tableData: [
        {
          id: 1,
          classify: "前端",
          title: "前端第一次考核",
          createTime: "2020/04/12 23:26:47",
          timeLimit: 600,
          paperScore: 100,
          startTime: "2020/04/15 00:00:00",
          endTime: "2020/04/17 00:00:00",
          user: {
            userName: "潘炳名",
          },
        },
      ],
      pageConfig: {
        currentPage: 1,
        limit: 10,
        title: "",
        classify: "",
      },
      total: 0,
      paperClassify,
      paperInfo: {},
      currentPaperId: null,
    };
  },
  components: {
    SubmitList,
    MarkDialog,
    PaperInfoDialog,
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 130px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

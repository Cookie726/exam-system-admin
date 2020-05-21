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
              @click="showMark = true"
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
            <el-button type="text" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
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
        :total="total"
      >
      </el-pagination>
    </div>
    <submit-list
      :paperId="currentPaperId"
      :dialogTableVisible.sync="showSubmitList"
    ></submit-list>
    <mark-dialog :showMarkDialog.sync="showMark"></mark-dialog>
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
export default {
  methods: {
    handleView(id) {
      let routeData = this.$router.resolve({
        name: "examStart",
        params: {
          id,
        },
      });
      window.open(routeData.href, "view_window");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit(paperId) {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中···",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(paperId);
      setTimeout(() => {
        this.paperInfo = {
          title: "前端测试",
          startTime: "2020-05-21 12:00:00",
          endTime: "2020-05-28 12:00:00",
          classify: "前端",
          paperScore: 20,
          studentIdList: ["2018010280"],
          user: {
            userName: "潘炳名",
          },
          questionList: [],
        };
        loading.close();
        this.showPaperInfoDialog = true;
      }, 1000);
    },
    resetForm() {
      this.pageConfig.classify = "";
      this.pageConfig.title = "";
    },
    handleSearch() {
      if (!(this.pageConfig.classify || this.pageConfig.title)) {
        this.$message.warning("查询条件不能为空");
        return;
      }
    },
    changeData(prop, e) {
      this.paperInfo[prop] = e;
    },
    handleAddPaper() {
      this.$router.push("/addPaper");
    },
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
        page: 1,
        limit: 10,
        title: "",
        classify: "",
      },
      total: 10,
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

<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column
        align="center"
        fixed
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
        label="限制答题时间"
        min-width="120"
      >
      </el-table-column>
      <el-table-column align="center" prop="paperScore" label="总分" width="90">
      </el-table-column>
      <el-table-column
        align="center"
        prop="user.userName"
        label="出题人"
        min-width="90"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="startTime"
        label="开始时间"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="endTime"
        label="截止时间"
        min-width="180"
      >
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small"
            >预览</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
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
  </div>
</template>

<script>
export default {
  methods: {
    handleView(row) {
      console.log(row);
      let routeData = this.$router.resolve({
        name: "markExam",
      });
      window.open(routeData.href, "_blank");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },

  data() {
    return {
      tableData: [
        {
          paper_id: 1,
          classify: "前端",
          title: "前端第一次考核",
          createTime: "2020/04/12 23:26:47",
          timeLimit: null,
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
      },
      total: 10,
    };
  },
};
</script>

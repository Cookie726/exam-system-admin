<template>
  <div class="question-container">
    <div class="btn-group">
      <el-button>添加试题</el-button>
      <el-button>删除</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" type="selection" width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="content"
        label="题干"
        min-width="320"
      >
      </el-table-column>
      <el-table-column align="center" prop="qtype" label="题型" width="120">
      </el-table-column>
      <el-table-column align="center" prop="author" label="创建人" width="120">
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
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageConfig.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageConfig.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },

  data() {
    return {
      tableData: [
        {
          content: "123123",
          qtype: "选择题",
          author: "潘炳名",
          createTime: "2020/04/14 22:18:22"
        }
      ],
      pageConfig: {
        limit: 10,
        page: 1
      }
    };
  }
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

<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        align="center"
        fixed
        prop="content"
        label="题干"
        min-width="320"
      >
      </el-table-column>
      <el-table-column align="center" prop="classify" label="分类" width="120">
      </el-table-column>
      <el-table-column align="center" prop="qtype" label="题型" width="120">
      </el-table-column>
      <el-table-column align="center" prop="value" label="分数" width="120">
      </el-table-column>
      <el-table-column align="center" prop="author" label="出题人" width="120">
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
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [
        {
          content: "123123",
          classify: "前端",
          qtype: "选择题",
          value: 10,
          author: "潘炳名"
        }
      ]
    };
  }
};
</script>
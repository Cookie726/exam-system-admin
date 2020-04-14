<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="80">
      </el-table-column>
      <el-table-column align="center" prop="realName" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="sno" label="学号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enterTime"
        label="申请时间"
        width="260"
      >
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        min-width="240"
      >
        <template slot-scope="scope">
          <el-button
            @click="handlePass([scope.row.sno])"
            type="text"
            size="small"
          >
            同意
          </el-button>
          <el-button
            @click="handleRefuse([scope.row.sno])"
            type="text"
            size="small"
            >拒绝</el-button
          >
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getNewUserList,
  passNewUser,
  refuseNewUser
} from "../../../api/message";
export default {
  methods: {
    handlePass(sno_list) {
      passNewUser({ sno_list });
    },
    handleRefuse(sno_list) {
      refuseNewUser({ sno_list });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      tableData: [
        {
          id: null,
          password: null,
          realName: "小王",
          sno: "2018012698",
          sex: "女",
          enterTime: "2020/4/14 19:08:08",
          power: null,
          status: null
        }
      ],
      multipleSelection: [],
      pageConfig: {
        limit: 10,
        page: 1
      }
    };
  },
  mounted() {
    getNewUserList(this.pageConfig).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="scss" scoped>
.pager {
  text-align: center;
}
.el-table th.gutter {
  display: table-cell !important;
}
.block {
  text-align: center;
  margin-top: 20px;
}
</style>

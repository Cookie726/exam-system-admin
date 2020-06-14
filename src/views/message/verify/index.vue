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
      <el-table-column align="center" prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="sno" label="学号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enterTime"
        label="申请时间"
        width="260"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="240">
        <template slot-scope="scope">
          <el-button @click="handlePass(scope.row.id)" type="text" size="small">
            同意
          </el-button>
          <el-button
            @click="handleRefuse(scope.row.id)"
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
        :current-page="pageConfig.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageConfig.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getNewUserList, passNewUser, refuseNewUser } from "@/api/message";
export default {
  methods: {
    handlePass(id) {
      window.ELEMENT.MessageBox.confirm("是否要通过审核？").then(() => {
        passNewUser({ id, status: 1 }).then((res) => {
          if (res.code === 0) {
            this.setData();
            this.$message.success("已同意");
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleRefuse(id) {
      window.ELEMENT.MessageBox.confirm("是否要拒绝审核？").then(() => {
        refuseNewUser({ id, status: -1 }).then((res) => {
          if (res.code === 0) {
            this.setData();
            this.$message.success("已拒绝");
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleSizeChange(val) {
      this.pageConfig.limit = val;
      this.setData();
    },
    handleCurrentChange(val) {
      this.pageConfig.currentPage = val;
      this.setData();
    },
    setData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      getNewUserList(this.pageConfig)
        .then((res) => {
          loading.close();
          if (res.code === 0) {
            this.tableData = res.data.userList;
            this.total = res.data.total;
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
  data() {
    return {
      tableData: [],
      pageConfig: {
        limit: 10,
        currentPage: 1,
        sno: "",
        userName: ""
      },
      total: 0,
    };
  },
  mounted() {
    this.setData();
  },
};
</script>

<style lang="scss" scoped>
.top-group {
  margin-bottom: 20px;
}
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
.el-table__row {
  td:not(.is-hidden):last-child {
    right: -1px;
  }
}
</style>

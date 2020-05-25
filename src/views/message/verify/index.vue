<template>
  <div>
    <div class="top-group">
      <el-button
        type="success"
        icon="el-icon-success"
        @click="handlePass(multipleSelection)"
        >同意</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-error"
        @click="handleRefuse(multipleSelection)"
        >拒绝</el-button
      >
    </div>
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
      <el-table-column align="center" label="操作" min-width="240">
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
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getNewUserList,
  // passNewUser,
  // refuseNewUser,
} from "../../../api/message";
export default {
  methods: {
    handlePass(snoList) {
      console.log(snoList);
      // this.$confirm("是否要通过审核？").then(() => {
      //   passNewUser({ snoList }).then(res => {
      //     if (res.code === 0) {
      //       this.setData(this.pageConfig);
      //       this.$message.success(res.msg);
      //     } else {
      //       this.$message.error(res.msg);
      //     }
      //   });
      // });
    },
    handleRefuse(snoList) {
      console.log(snoList);
      // this.$confirm("是否要拒绝审核？").then(() => {
      //   refuseNewUser({ snoList }).then(res => {
      //     if (res.code === 0) {
      //       this.setData(this.pageConfig);
      //       this.$message.success(res.msg);
      //     } else {
      //       this.$message.error(res.msg);
      //     }
      //   });
      // });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((info) => info.sno);
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      this.pageConfig.limit = val;
      this.setData(this.pageConfig);
    },
    handleCurrentChange(val) {
      this.pageConfig.page = val;
      this.setData(this.pageConfig);
    },
    setData(param) {
      getNewUserList(param).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data;
          this.total = res.count;
        }
      });
    },
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
          status: null,
        },
        {
          id: null,
          password: null,
          realName: "小王",
          sno: "2018012698",
          sex: "女",
          enterTime: "2020/4/14 19:08:08",
          power: null,
          status: null,
        },
      ],
      multipleSelection: [],
      pageConfig: {
        limit: 10,
        page: 1,
      },
      total: 0,
    };
  },
  mounted() {
    this.setData(this.pageConfig);
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

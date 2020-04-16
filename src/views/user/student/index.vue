<template>
  <div>
    <el-table
      :data="tableData.list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" prop="realName" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="sno" label="学号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="120">
      </el-table-column>
      <el-table-column align="center" label="角色" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.power | getRoleName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="enterTime"
        label="加入时间"
        width="200"
      >
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <p>{{ scope.row.status | getStatus }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="240"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleDelete([scope.row.sno])"
            type="text"
            size="small"
          >
            {{ scope.row.status | getStatusButton }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="updatePower(scope.row.sno)"
            >设置为老师</el-button
          >
          <el-button type="text" size="small">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <v-page
        :currentPage="param.page"
        :pageSize="param.limit"
        :total="tableData.total"
        @pageChange="onPageChange"
      ></v-page>
    </div>
  </div>
</template>
<script>
import VPage from "../../../components/pager";
import {
  getUserList,
  updateUserPower,
  deleteUser
} from "../../../api/userManage";
export default {
  methods: {
    handleDelete(snoList) {
      deleteUser({ snoList });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updatePower(sno) {
      updateUserPower({ sno, power: 1 });
    },
    async onPageChange(option) {
      Object.assign(this.param, option);
      const res = await getUserList(this.param);
      this.tableData.list = res.data;
      this.tableData.total = res.count;
    }
  },
  async mounted() {
    const res = await getUserList(this.param);
    this.tableData.list = res.data;
    this.tableData.total = res.count;
  },
  data() {
    return {
      tableData: {
        list: [],
        total: 0
      },
      param: {
        page: 1,
        limit: 20,
        power: 1
      },
      multipleSelection: []
    };
  },
  components: {
    "v-page": VPage
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

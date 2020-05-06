<template>
  <div>
    <el-button-group class="btn-group">
      <el-button @click="handleDelete(multipleSelection)" type="primary"
        >批量禁用</el-button
      >
      <el-button @click="startUser(multipleSelection)" type="primary"
        >批量启用</el-button
      ></el-button-group
    >
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
      <el-table-column align="center" label="操作" min-width="240">
        <template slot-scope="scope">
          <el-button
            @click="
              scope.row.status === '1'
                ? handleDelete([scope.row.sno])
                : startUser([scope.row.sno])
            "
            type="text"
            size="small"
          >
            {{ scope.row.status | getStatusButton }}
          </el-button>
          <el-button type="text" size="small" @click="updatePower(scope.row)"
            >设置为学生</el-button
          >
          <el-button type="text" size="small">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <v-page
        :currentPage.sync="param.page"
        :pageSize.sync="param.limit"
        :total="tableData.total"
      ></v-page>
    </div>
  </div>
</template>
<script>
import VPage from "@/components/pager";
import { userManageMixin } from "@/mixins";
import {
  getUserList,
  updateUserPower,
  deleteUser,
  startUser,
} from "@/api/userManage";
export default {
  mixins: [userManageMixin],
  methods: {
    handleDelete(snoList) {
      deleteUser({
        snoList,
      });
    },
    startUser(snoList) {
      startUser({
        snoList,
      });
    },
    async updatePower({ sno, id }) {
      const res = await updateUserPower({ sno, id });
      console.log(res);
    },
    async loadData() {
      const res = await getUserList(this.param);
      this.tableData.list = res.data;
      this.tableData.total = res.count;
    },
  },
  data() {
    return {
      param: {
        page: 1,
        limit: 10,
        power: 2,
      },
    };
  },
  components: {
    "v-page": VPage,
  },
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
.btn-group {
  margin-bottom: 20px;
}
</style>

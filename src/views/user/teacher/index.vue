<template>
  <div>
    <div>
      <el-form :inline="true" :model="param" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input
            v-model="param.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="param.sno" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="sno" label="学号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column align="center" label="角色" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.role | getRoleName }}</p>
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
              scope.row.status === 1
                ? handleDelete([scope.row.id])
                : startUser([scope.row.id])
            "
            type="text"
            size="small"
          >
            {{ scope.row.status | getStatusButton }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="updatePower(scope.row.sno)"
            >设置为学生</el-button
          >
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
import { getUserList, updateUserPower } from "@/api/userManage";
export default {
  methods: {
    handleDelete(idList) {
      const data = {
        idList,
        status: 2,
      };
      console.log(data);
    },
    startUser(idList) {
      const data = {
        idList,
        status: 1,
      };
      console.log(data);
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
    resetForm() {
      this.param.userName = "";
      this.param.sno = "";
    },
    handleSearch() {
      if (!(this.param.userName || this.param.sno)) {
        window.ELEMENT.Message.warning("查询条件不能为空");
        return;
      }
    },
  },
  data() {
    return {
      param: {
        page: 1,
        limit: 10,
        role: 1,
        userName: "",
        sno: "",
      },
      total: 10,
      userList: [
        {
          userName: "潘炳名",
          id: 1,
          sno: "2018010280",
          role: 1,
          status: 1,
          gender: "男",
          enterTime: "2020-05-21 21:20:22",
        },
      ],
    };
  },
  components: {
    "v-page": VPage,
  },
  mixins: [userManageMixin],
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

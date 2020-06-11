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
    <el-table :data="userList" border style="width: 100%">
      <el-table-column align="center" prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="sno" label="学号" width="160">
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column align="center" label="角色" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.roles | getRoleName }}</p>
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
            @click="updatePower([scope.row.sno])"
            >设置为老师</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="param.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="param.limit"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
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
    updatePower(snoList) {
      window.ELEMENT.MessageBox.confirm("是否要设置为老师？").then(async () => {
        try {
          const param = {
            snoList,
            roleId: 3,
          };
          const res = await updateUserPower(param);
          if (res.code === 0) {
            window.ELEMENT.Message.success("更改成功");
            this.loadData(this.param);
          } else {
            window.ELEMENT.Message.error(res.msg);
          }
        } catch (e) {
          throw new Error(e);
        }
      });
    },
    async loadData(param) {
      const res = await getUserList(param);
      this.userList = res.data.userList;
      this.total = res.data.total;
    },
  },
  data() {
    return {
      param: {
        currentPage: 1,
        limit: 10,
        roleId: 2,
        userName: "",
        sno: "",
      },
    };
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

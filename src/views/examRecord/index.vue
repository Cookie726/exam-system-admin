<template>
  <div class="home-container">
    <div v-if="list.length === 0" class="empty">
      <svg-icon class="empty-icon" icon-class="empty"></svg-icon>
      <h2>考试记录为空!</h2>
    </div>
    <div class="paper-container">
      <div class="paper-items">
        <template v-for="item in list">
          <paper-card :type="0" :key="item.id" :paperItem="item"></paper-card>
        </template>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getExamRecord } from "@/api/examRecord";
import PaperCard from "@/components/paperCard";
export default {
  data() {
    return {
      list: [
        {
          startTime: "2020/04/22 00:00:00",
          endTime: "2020/04/26 00:00:00",
          timeLimit: 1800,
          title: "前端第一次测试",
          id: "10001",
          paperScore: 100,
          grades: 20
        },
        {
          startTime: "2020/04/22 00:00:00",
          endTime: "2020/04/26 00:00:00",
          timeLimit: 1800,
          title: "前端第一次测试",
          id: "10002",
          paperScore: 100,
          grades: 80
        },
        {
          startTime: "2020/04/22 00:00:00",
          endTime: "2020/04/26 00:00:00",
          timeLimit: 1800,
          title: "前端第一次测试",
          id: "10003",
          paperScore: 100,
          grades: 20
        },
        {
          startTime: "2020/04/22 00:00:00",
          endTime: "2020/04/26 00:00:00",
          timeLimit: 1800,
          title: "前端第一次测试",
          id: "10004",
          paperScore: 100,
          grades: 100
        },
        {
          startTime: "2020/04/22 00:00:00",
          endTime: "2020/04/26 00:00:00",
          timeLimit: 1800,
          title: "前端第一次测试",
          id: "10005",
          paperScore: 100,
          grades: 20
        },
      ],
      total: 0,
      pageConfig: {
        currentPage: 1,
        limit: 12,
        title: ""
      },
    };
  },
  components: {
    "paper-card": PaperCard,
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中···",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await getExamRecord(this.pageConfig);
        if (res.code === 0) {
          this.list = res.data.paperList;
          this.total = res.data.total;
        } else {
          throw new Error(res.msg);
        }
      } catch (e) {
        (e) => {
          throw new Error(e);
        };
      } finally {
        loading.close();
      }
    },
    handleSizeChange(pageSize) {
      this.pageConfig.limit = pageSize;
      this.setData();
    },
    handleCurrentChange(currentPage) {
      this.pageConfig.limit = currentPage;
      this.setData();
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  .paper-items {
    padding-top: 20px;
    overflow: hidden;
  }
  .block {
    text-align: center;
  }
}
.empty {
  text-align: center;
  padding: 40px 0;
  .empty-icon {
    width: 240px;
    height: 240px;
  }
}
</style>

<template>
  <div class="home-container">
    <div v-if="list.length === 0" class="empty">
      <svg-icon class="empty-icon" icon-class="empty"></svg-icon>
      <h2>考试记录为空!</h2>
    </div>
    <div class="paper-container">
      <div class="paper-items">
        <template v-for="item in paperList">
          <paper-card :type="0" :key="item.id" :paperItem="item"></paper-card>
        </template>
      </div>
      <div class="block">
        <el-pagination
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
      list: [],
      total: 0,
      pageConfig: {
        currentPage: 1,
        limit: 12,
        title: "",
      },
    };
  },
  components: {
    "paper-card": PaperCard,
  },
  computed: {
    paperList() {
      return this.list.map((p) => {
        const _p = {
          ...p.paperInfo,
          isMark: !!p.gradesDTO,
          grades: p.gradesDTO?.score,
        };
        return _p;
      });
    },
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
          this.list = res.data.recordPaperInfoDTOList;
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
    handleCurrentChange(currentPage) {
      this.pageConfig.currentPage = currentPage;
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

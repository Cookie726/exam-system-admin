<template>
  <div class="home-container">
    <div v-if="list.length === 0" class="empty">
      <svg-icon class="empty-icon" icon-class="empty"></svg-icon>
      <h2>没有需要做的考题!</h2>
    </div>
    <div class="paper-container">
      <div class="paper-items">
        <template v-for="item in list">
          <paper-card :type="0" :key="item.id" :paperItem="item"></paper-card>
        </template>
      </div>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PaperCard from "@/components/paperCard";
export default {
  data() {
    return {
      list: [
        {
          start: "2020/04/22 00:00:00",
          end: "2020/04/26 00:00:00",
          limitTime: 1800,
          title: "前端第一次测试",
          id: "10001",
        },
        {
          start: "2020/04/22 00:00:00",
          end: "2020/04/26 00:00:00",
          limitTime: 1800,
          title: "前端第一次测试",
          id: "10002",
        },
        {
          start: "2020/04/22 00:00:00",
          end: "2020/04/26 00:00:00",
          limitTime: 1800,
          title: "前端第一次测试",
          id: "10003",
        },
        {
          start: "2020/04/22 00:00:00",
          end: "2020/04/26 00:00:00",
          limitTime: 1800,
          title: "前端第一次测试",
          id: "10004",
        },
        {
          start: "2020/04/22 00:00:00",
          end: "2020/04/26 00:00:00",
          limitTime: 1800,
          title: "前端第一次测试",
          id: "10005",
        },
      ],
    };
  },
  components: {
    "paper-card": PaperCard,
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

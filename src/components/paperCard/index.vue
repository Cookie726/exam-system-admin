<template>
  <div class="paper-card">
    <div class="item-title">{{ paperItem.title }}</div>
    <div class="item-row item-during">
      <div class="item-label">考试时间：</div>
      <div class="item-data">{{ paperItem.start }}~{{ paperItem.end }}</div>
    </div>
    <div class="item-row item-limit">
      <div class="item-label">考试时长：</div>
      <div class="item-data">{{ limitTime }}分钟</div>
    </div>
    <el-button type="primary" @click="handleAnswer" class="button"
      >开始答题</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    paperItem: Object,
    type: Number,
  },
  computed: {
    limitTime() {
      return Math.floor(this.paperItem.limitTime / 60);
    },
  },
  methods: {
    handleAnswer() {
      let routeData = this.$router.resolve({
        name: "examStart",
        query: { id: this.paperItem.id },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.paper-card {
  width: 390px;
  height: 176px;
  padding: 20px;
  margin-right: 24px;
  margin-bottom: 24px;
  border-left: 4px solid #c1c1cb;
  float: left;
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(58, 62, 81, 0.2);
  border-radius: 4px;
  overflow: hidden;
  top: 0;
  transition: top 0.2s linear;
  &:hover {
    top: -10px;
    box-shadow: 0 2px 10px 0 rgba(58, 62, 81, 0.1);
    .button {
      display: block;
    }
  }
  .item-title {
    line-height: 28px;
    font-size: 20px;
    color: #2f3445;
    margin-bottom: 10px;
    height: 56px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-row {
    padding-left: 72px;
    color: #666;
    line-height: 20px;
    position: relative;
    .item-label {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .button {
    display: none;
    position: absolute;
    right: 15px;
  }
}
</style>

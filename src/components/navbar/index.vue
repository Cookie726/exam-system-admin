<template>
  <div class="nav-container">
    <div class="nav-center-container">
      <ul class="left-menu">
        <li :class="{ active: currentIndex === 0 }">
          <router-link :to="'#1'">首页</router-link>
        </li>
        <li :class="{ active: currentIndex === 1 }">
          <router-link :to="'#2'">历史考试</router-link>
        </li>
        <li :class="{ active: currentIndex === 2 }">
          <router-link :to="'#3'">错题中心</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentIndex: Number,
  },
};
</script>

<style lang="less" scoped>
a {
  color: #333;
}
.nav-container {
  position: fixed;
  z-index: 999;
  top: 0;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  min-width: 1200px;
  width: 100%;
  padding: 0 24px;
  .nav-center-container {
    width: 1200px;
    margin: 0 auto;
    .left-menu {
      list-style: none;
      float: left;
      li {
        color: #333333;
        width: auto;
        padding-left: 8px;
        padding-right: 8px;
        float: left;
        height: 52px;
        line-height: 52px;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid #e33e33;
          color: #222226 !important;
        }
      }
    }
  }
}
</style>

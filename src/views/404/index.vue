<template>
  <div>
    <div class="icon">
      <div><svg-icon icon-class="404"></svg-icon></div>
      <div class="right">
        <p>404</p>
        <p class="content">你要访问的资源不存在</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  .svg-icon {
    width: 32em;
    height: 16em;
  }
  .right {
    margin-left: 40px;
    p {
      font-size: 8em;
      &.content {
        font-size: 2em;
        font-weight: 700;
      }
    }
  }
}
</style>

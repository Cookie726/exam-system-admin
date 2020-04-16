<template>
  <transition name="fade">
    <div class="modal" v-show="showDialog">
      <div class="main-container">
        sdf
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showDialog: Boolean
  }
};
</script>

<style lang="less" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 2000;
  left: 0;
  top: 0;
  .main-container {
    padding: 100px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

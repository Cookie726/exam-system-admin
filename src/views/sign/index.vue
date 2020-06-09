<template>
  <div class="container">
    <vue-particles
      class="particles"
      color="#a0a0a0"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#a1a1a1"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="1"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.container {
  background-color: #e3e4e6;
  height: 100%;
  div.particles {
    height: 100%;
  }
}
</style>

<template>
  <div>
    <el-submenu
      v-if="item.children && item.children.length > 0"
      :index="item.moduleName"
    >
      <template slot="title">
        <div class="svg-container">
          <svg-icon :icon-class="item.icon"></svg-icon>
        </div>
        <span>{{ item.name }}</span>
      </template>
      <sidebar-item v-for="(i, index) in item.children" :key="index" :item="i">
      </sidebar-item>
    </el-submenu>
    <el-menu-item
      v-else
      @click="goRoute(item.moduleName)"
      :index="item.moduleName"
    >
      <div class="svg-container">
        <svg-icon :icon-class="item.icon"></svg-icon>
      </div>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    goRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style></style>

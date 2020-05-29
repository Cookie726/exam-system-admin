<template>
  <el-menu
    :class="{ navCollapsed: isSidebarNavCollapse }"
    :collapse="isSidebarNavCollapse"
    background-color="#304156"
    text-color="#eee"
    active-text-color="#4dbcff"
    :default-active="currentMenu"
  >
    <sidebar-item
      v-for="(item, index) in sidebarList"
      :key="index"
      :item="item"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapState } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  computed: {
    ...mapState(["isSidebarNavCollapse", "currentMenu", "sidebarList"]),
  },
  methods: {
    gotoRoute(name) {
      this.$router.push({ name });
    },
    goRoute() {
      this.$router.push("/home");
    },
  },
  components: {
    SidebarItem,
  },
};
</script>

<style lang="scss">
.iconfont {
  margin-right: 8px;
  color: #fff;
  font-size: 18px;
}
div.menu-container > li.el-menu-item,
div.menu-container > li.el-submenu > .el-submenu__title {
  border-bottom: 1px solid rgba(238, 238, 238, 0.1);
}
.el-menu-item {
  background: #304156 !important;
}
/* 菜单hover时的背景 */
.el-submenu__title:hover,
.el-menu-item:hover {
  background: #223041 !important;
}
/* 菜单active时的背景 */
.el-menu-item.is-active {
  background: #293748 !important;
}
ul.navCollapsed {
  ul {
    display: none;
  }
  span {
    display: none;
  }
  .el-submenu__icon-arrow {
    display: none;
  }
}
.svg-container {
  padding: 6px 10px 6px 5px;
  vertical-align: middle;
  display: inline-block;
}
</style>

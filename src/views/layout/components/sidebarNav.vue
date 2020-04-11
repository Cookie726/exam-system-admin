<template>
  <el-menu
    :class="{ navCollapsed: isSidebarNavCollapse }"
    :collapse="isSidebarNavCollapse"
    background-color="#304156"
    text-color="#eee"
    active-text-color="#4dbcff"
    :default-active="currentMenu"
  >
    <el-menu-item @click="gotoRoute('control')" index="control">
      <div class="svg-container">
        <svg-icon icon-class="sale"></svg-icon>
      </div>
      <span>控制台</span>
    </el-menu-item>
    <el-submenu index="用户管理">
      <template slot="title">
        <div class="svg-container">
          <svg-icon icon-class="student"></svg-icon>
        </div>
        <span>用户管理</span>
      </template>
      <el-menu-item @click="gotoRoute('userStudent')" index="userStudent">
        <div class="svg-container">
          <svg-icon icon-class="student-list"></svg-icon>
        </div>
        <span>学生管理</span>
      </el-menu-item>
      <el-menu-item @click="gotoRoute('userTeacher')" index="userTeacher">
        <div class="svg-container">
          <svg-icon icon-class="deposit"></svg-icon>
        </div>
        <span>教师管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="卷题管理">
      <template slot="title">
        <div class="svg-container">
          <svg-icon icon-class="donate"></svg-icon>
        </div>
        <span>卷题管理</span>
      </template>
      <el-menu-item @click="gotoRoute('testPaper')" index="testPaper">
        <div class="svg-container">
          <svg-icon icon-class="donate-goods"></svg-icon>
        </div>
        <span>试卷管理</span>
      </el-menu-item>
      <el-menu-item @click="gotoRoute('testQuestion')" index="testQuestion">
        <div class="svg-container">
          <svg-icon icon-class="donate-record"></svg-icon>
        </div>
        <span>题库管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="消息中心">
      <template slot="title">
        <div class="svg-container">
          <svg-icon icon-class="cargo"></svg-icon>
        </div>
        <span>消息中心</span>
      </template>
      <el-menu-item @click="gotoRoute('messageVerify')" index="messageVerify">
        <div class="svg-container">
          <svg-icon icon-class="view-goods"></svg-icon>
        </div>
        <span>注册审核</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import "../../../icons/svg/donate.svg";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isSidebarNavCollapse", "currentMenu"])
  },
  methods: {
    gotoRoute(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  .iconfont + span {
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

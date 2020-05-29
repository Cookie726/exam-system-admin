import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import exercise from "./modules/exercise"
import router from "./modules/router"
import {
  getSidebarList
} from "@/utils/helpers"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边导航是否折叠
    isSidebarNavCollapse: false,
    currentMenu: null,
    crumbList: [],
    editableTabs: [],
    sidebarList: []
  },
  mutations: {
    toggleNavCollapse(state) {
      state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    SET_CURRENT_MENU(state, currentMenu) {
      state.currentMenu = currentMenu
    },
    setCrumbList(state, crumbList) {
      state.crumbList = crumbList
    },
    setEditableTabs(state, to) {
      if (to.matched[0].name != 'layout') {
        return;
      }
      let have = false
      state.editableTabs.forEach(element => {
        if (element.name === to.name) {
          have = true
          return;
        }
      })
      if (!have && to.name != "layout") {
        const newTab = {
          name: to.name,
          title: to.meta.name
        }
        state.editableTabs.push(newTab)
      }
    },
    REMOVE_TABS(state, name) {
      const newTabs = state.editableTabs.filter(element => element.name != name)
      state.editableTabs = newTabs
    },
    SET_SIDEBAR_LIST(state, routers) {
      const layout = routers.find(router => {
        return router.name === "layout"
      })
      state.sidebarList = getSidebarList(layout.children)
    }
  },
  actions: {},
  modules: {
    user,
    exercise,
    router
  }
});
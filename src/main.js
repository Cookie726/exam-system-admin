import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";
import * as filters from "./filters/filters"
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
router.beforeEach((to, from, next) => {
  if (store.state.user.user) { // 判断是否登录
    if (to.name === "signin") { // 登录状态下禁止进入登录页面
      const name = from.name ? from.name : 'layout'
      next({
        name
      })
      window.ELEMENT.Message.warning("请先退出该账号")
    } else {
      if (store.state.router.dynamicRoutes.length === 0) { // 判断是否已添加动态路由
        const role = store.state.user.user.roles[0].name
        store.dispatch("router/GenerateRoutes", role).then(() => {
          router.addRoutes(store.state.router.dynamicRoutes)
          store.commit("SET_SIDEBAR_LIST", store.state.router.dynamicRoutes) // 设置侧边栏菜单
          next({
            ...to,
            replace: true
          }) // 确保addRoutes已完成
        })
      } else {
        next()
      }
    }
  } else {
    if (to.name === "signin" || to.name === 'signup') {
      next()
    } else {
      next({
        path: "/sign/signin"
      }) // 直接进入，不再执行钩子函数，防止出现死循环导致栈溢出
    }
  }
})
router.afterEach(to => {
  var routerList = to.matched;
  store.commit("setCrumbList", routerList);
  store.commit("SET_CURRENT_MENU", to.name);
  store.commit("setEditableTabs", to);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");









// response = {
//   code: 0,
//   msg: "",
//   data: {
//     paper: {},
//     questionList: [{
//       content: "",
//       classify: "",
//       questionType: "",
//       analysis: "",
//       value: 0,
//       optionList: [],
//       studentAnswer: "",
//       filePath: "",
//       user: {},
//       studentOptionList: []
//     }]
//   }
// }
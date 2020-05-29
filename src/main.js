import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";
import * as filters from "./filters/filters"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
router.beforeEach((to, _, next) => {
  if (store.state.user.user) {
    if (store.state.router.dynamicRoutes.length === 0) {
      const role = store.state.user.user.role
      store.dispatch("router/GenerateRoutes", role).then(() => {
        router.addRoutes(store.state.router.dynamicRoutes)
        store.commit("SET_SIDEBAR_LIST", store.state.router.dynamicRoutes)
        next({
          ...to,
          replace: true
        })
      })
    } else {
      next()
    }
  } else {
    if (to.name === "signin") {
      next()
    } else {
      next({
        path: "/sign/signin"
      })
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
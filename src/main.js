import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";
import * as filters from "./filters/filters"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
console.log(window.ELEMENT)
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
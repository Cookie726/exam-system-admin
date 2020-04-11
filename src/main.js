import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icons";
import * as filters from "./filters/filters"
import VueQuillEditor from 'vue-quill-editor'
import * as Quill from 'quill' //引入编辑器    
import resizeImage from 'quill-image-resize-module' // 图片缩放组件。
import {
  ImageDrop
} from 'quill-image-drop-module'; // 图片拖动组件。
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/resizeImage ', resizeImage)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.afterEach(to => {
  var routerList = to.matched;
  store.commit("setCrumbList", routerList);
  store.commit("SET_CURRENT_MENU", to.name);
  store.commit("setEditableTabs", to);
});
Vue.use(elementui);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";
import Sign from "../views/sign"
import Signin from "../views/sign/signin"
import Signup from "../views/sign/signup"
import MarkExam from "../views/markExam"

import RouterConfig from './modules'
console.log("RouterConfig", RouterConfig)
Vue.use(VueRouter);
const routes = [{
  path: "/markExam",
  name: "markExam",
  component: MarkExam
}, {
  path: "/sign",
  name: "sign",
  component: Sign,
  children: [{
    path: "signin",
    name: "signin",
    component: Signin,
    meta: {
      name: "登录"
    }
  }, {
    path: "signup",
    name: "signup",
    component: Signup,
    meta: {
      name: "注册"
    }
  }]
}, {
  path: "",
  name: "layout",
  component: Layout,
  meta: {
    name: 'layout'
  },
  children: RouterConfig
}];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});



export default router;
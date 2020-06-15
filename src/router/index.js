import Vue from "vue";
import VueRouter from "vue-router";
const Layout = resolve => require(["@/views/layout"], resolve)
const Sign = resolve => require(["@/views/sign"], resolve)
const Signin = resolve => require(["@/views/sign/signin"], resolve)
const Signup = resolve => require(["@/views/sign/signup"], resolve)
import RouterConfig from './modules'
import Error from "@/views/404"
export const asyncRoute = [{
    path: "",
    name: "layout",
    component: Layout,
    meta: {
      name: 'layout',
    },
    children: RouterConfig
  },
  {
    path: '*',
    redirect: "/404"
  }
]
Vue.use(VueRouter);
const routes = [{
    path: "/updatePaper/:id",
    name: "updatePaper",
    component: resolve => require(["@/views/updatePaper"], resolve)
  }, {
    path: "/examStart/:id",
    name: "examStart",
    component: resolve => require(["@/views/examStart"], resolve)
  },
  {
    path: "/examRecordDetail/:id",
    name: "examRecordDetail",
    meta: {
      name: "答题详情",
    },
    component: resolve => require(["@/views/examRecordDetail"], resolve)
  }, {
    path: "/paperPreview/:id",
    name: "paperPreview",
    meta: {
      name: "预览试卷",
    },
    component: resolve => require(["@/views/paperPreview"], resolve)
  }, {
    path: "/markExam/:id/:userId",
    name: "markExam",
    component: resolve => require(["@/views/markExam"], resolve)
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
  },
  {
    path: '/404',
    component: Error,
    meta: {
      name: "404"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
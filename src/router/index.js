import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";
import Sign from "../views/sign"
import Signin from "../views/sign/signin"
import Signup from "../views/sign/signup"
import MarkExam from "../views/markExam"
import ExamStart from "../views/examStart"
import UpdatePaper from "../views/updatePaper"
import RouterConfig from './modules'
import Error from "@/views/404"
export const asyncRoute = [{
    path: "",
    name: "layout",
    component: Layout,
    meta: {
      name: 'layout',
      role: ["admin", "teacher", "student"]
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
    component: UpdatePaper
  }, {
    path: "/examStart/:id",
    name: "examStart",
    component: ExamStart
  },
  {
    path: "/recordDetail/:id",
    name: "recordDetail",
    meta: {
      name: "答题记录",
      role: ["admin", "teacher", "student"],
    },
    component: resolve => require(["@/views/recordDetail"], resolve)
  }, {
    path: "/paperPreview/:id",
    name: "paperPreview",
    meta: {
      name: "预览试卷",
      role: ["admin", "teacher", "student"],
    },
    component: resolve => require(["@/views/paperPreview"], resolve)
  }, {
    path: "/markExam/:id/:userId",
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
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});



export default router;
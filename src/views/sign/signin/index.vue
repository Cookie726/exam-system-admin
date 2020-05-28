<template>
  <div class="signin-container">
    <fieldset class="validate-container">
      <h1 class="top-title">用户登录</h1>
      <ul>
        <li>
          <svg-icon icon-class="sno"></svg-icon>
          <input type="text" v-model="signinForm.sno" class="validate-input" />
        </li>
        <li>
          <svg-icon icon-class="password"></svg-icon>
          <input
            type="password"
            v-model="signinForm.password"
            class="validate-input"
          />
        </li>
      </ul>
      <input class="signin-btn" type="button" @click="signin" value="登录" />
      <p class="center router-footer">
        <router-link class="router-link" :to="{ name: 'signup' }"
          >注册账号</router-link
        >
      </p>
    </fieldset>
  </div>
</template>

<script>
// import { validateSigninForm } from "../../../utils/validate";
import { asyncRoute } from "@/router";
import { signin } from "../../../api/sign";
import { getRoutes } from "@/utils/helpers";
export default {
  data() {
    return {
      signinForm: {
        sno: "",
        password: "",
      },
    };
  },
  methods: {
    signin() {
      // const pass = validateSigninForm.call(this, this.signinForm);
      // if (pass) {
      signin(this.signinForm).then(() => {
        // console.log(res);
        console.log(asyncRoute);
        console.log(getRoutes(0, asyncRoute));
        // if (res.code === 0) {
        //   // this.$router.addRoutes(dynamicRoute);
        //   console.log(dynamicRoute);
        //   this.$router.push({
        //     name: "updatePaper",
        //     params: {
        //       id: 1,
        //     },
        //   });
        // }
        // if (res.code === 0) {
        //   console.log("登录成功，页面跳转中。。。")
        //   // this.$message.success("登录成功，页面跳转中。。。");
        //   if (res.power === 3) {
        //     this.$router.replace({ name: "control" });
        //   }
        // }
      });
      // }
    },
  },
};
</script>

<style lang="less" scoped>
@btnColor: #50a840;
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
}
.center {
  text-align: center;
}
ul {
  padding: 0;
  li {
    list-style: none;
  }
}
.top-title {
  margin-bottom: 20px;
  color: @btnColor;
}
.signin-container {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2),
    -10px -10px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  padding: 28px 0;
  width: 480px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 14px;
  background-color: #fff;
  .validate-container {
    border: 0px solid #c0c0c0;
    margin: 0;
    padding: 0 50px;
    ul {
      li {
        position: relative;
        margin-bottom: 16px;
        .svg-icon {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 16px;
          top: 12px;
        }
        .validate-input {
          outline: none;
          border: none;
          width: 100%;
          height: 46px;
          line-height: 1.4;
          line-height: 2 \9;
          font-size: 14px;
          padding: 10px 0 10px 46px;
          border-radius: 100px;
          border: 1px solid #e6e6e6;
          background: #fff !important;
          box-sizing: border-box;
          &:focus {
            border: 1px solid @btnColor;
          }
        }
      }
    }
    .signin-btn {
      background: #57b846;
      outline: none;
      border: none;
      width: 100%;
      height: 46px;
      font-size: 20px;
      border-radius: 100px;
      background-color: #57b846;
      margin-bottom: 20px;
      color: #fff;
      &:hover {
        background-color: @btnColor;
        cursor: pointer;
      }
    }
    .router-link {
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      color: #666;
    }
  }
}
</style>

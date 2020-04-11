<template>
  <div class="login-box">
    <div class="login-container">
      <div class="login-wrapper">
        <div class="title">
          <h2>用户注册</h2>
        </div>
        <el-form
          :model="loginForm"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item>
            <el-input
              v-model="loginForm.realName"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.sno"
              placeholder="学号"
              type="text"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-radio v-model="loginForm.sex" label="男">男</el-radio>
            <el-radio v-model="loginForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginForm.rePass"
              placeholder="确认密码"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
            >注册</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from "../../../api/sign";
export default {
  data() {
    return {
      loginForm: {
        sno: "",
        password: "",
        realName: "",
        sex: "男",
        enterTime: "",
        rePass: ""
      },
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      if (this.loginForm.password != this.loginForm.rePass) {
        this.$message({
            message: "两次密码不相同",
            type: "error"
        })
        return;
      } else {
        const res = await signup(this.loginForm);
        console.log(res);
      }
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  background-color: red;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #555555;
      height: 47px;
      caret-color: #333;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-box {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-wrapper {
    width: 610px;
    border-radius: 8px;
    box-shadow: 0px 0px 42px rgba(0, 0, 0, 1);
    margin: 160px auto 0;
    padding-top: 20px;
    background-color: rgb(255, 255, 255);
    display: block;
    .title {
      text-align: center;
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>

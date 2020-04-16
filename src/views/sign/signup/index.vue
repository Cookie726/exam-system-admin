<template>
  <div class="signup-container">
    <fieldset class="validate-container">
      <h1>用户注册</h1>
      <ul>
        <li>
          <svg-icon icon-class="username"></svg-icon>
          <input
            v-model.trim="signupForm.realName"
            placeholder="姓名"
            type="text"
            class="validate-input"
          />
        </li>
        <li>
          <svg-icon icon-class="sno"></svg-icon>
          <input
            v-model.number="signupForm.sno"
            placeholder="学号"
            type="text"
            class="validate-input"
          />
        </li>
        <li>
          <input
            type="radio"
            value="男"
            v-model="signupForm.sex"
            class="hidden"
            name="sex"
            id="male"
          />
          <label for="male" class="btn">男</label>
          <input
            type="radio"
            value="女"
            v-model="signupForm.sex"
            class="hidden"
            name="sex"
            id="female"
          />
          <label for="female" class="btn">女</label>
        </li>
        <li>
          <svg-icon icon-class="password"></svg-icon>
          <input
            v-model.trim="signupForm.password"
            placeholder="密码"
            type="password"
            class="validate-input"
          />
        </li>
        <li>
          <svg-icon icon-class="password"></svg-icon>
          <input
            v-model.trim="confirmPwd"
            placeholder="确认密码"
            type="password"
            class="validate-input"
          />
        </li>
      </ul>
      <input class="signup-btn" @click="signup" type="button" value="注册" />
      <p class="center">
        <router-link class="router-link" :to="{ name: 'signin' }"
          >已有账号，直接登录</router-link
        >
      </p>
    </fieldset>
  </div>
</template>

<script>
import { signup } from "../../../api/sign";
import { validateSignupForm } from "../../../utils/validate";
export default {
  data() {
    return {
      signupForm: {
        realName: "",
        sno: "",
        sex: "男",
        password: ""
      },
      confirmPwd: "",
      content: ""
    };
  },
  methods: {
    signup() {
      const pass = validateSignupForm.call(this, {
        ...this.signupForm,
        confirmPwd: this.confirmPwd
      });
      if (pass) {
        const enterTime = new Date().getTime();
        signup(Object.assign({ enterTime }, this.signupForm)).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.center {
  text-align: center;
}
ul {
  padding: 0;
  li {
    list-style: none;
  }
}
.signup-container {
  position: absolute;
  width: 480px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 14px;
  background-color: gray;
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
        }
        input[type="radio"]:checked + label {
          background: #a9b3bf;
          border: 1px solid #878f98;
          color: #fff;
        }
        label {
          display: inline-block;
          border-radius: 4px;
          color: #666;
          margin-right: 6px;
          border: 1px solid #abbcd0;
          padding: 10px 37px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .signup-btn {
      background: #57b846;
      outline: none;
      border: none;
      width: 100%;
      height: 46px;
      font-size: 20px;
      border-radius: 100px;
      background-color: #57b846;
      color: #fff;
      &:hover {
        background-color: #50a840;
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

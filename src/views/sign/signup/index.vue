<template>
  <div class="signup-container">
    <fieldset class="validate-container">
      <h1 class="top-title">用户注册</h1>
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
            autocomplete="off"
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
            autocomplete="new-password"
          />
        </li>
        <li>
          <svg-icon icon-class="password"></svg-icon>
          <input
            v-model.trim="confirmPwd"
            placeholder="确认密码"
            type="password"
            class="validate-input"
            autocomplete="new-password"
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
        password: "",
      },
      confirmPwd: "",
      content: "",
    };
  },
  methods: {
    signup() {
      const pass = validateSignupForm.call(this, {
        ...this.signupForm,
        confirmPwd: this.confirmPwd,
      });
      if (pass) {
        const enterTime = new Date().getTime();
        signup(Object.assign({ enterTime }, this.signupForm)).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
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
.signup-container {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2),
    -10px -10px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 480px;
  left: 50%;
  padding: 28px 0;
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
        input[type="radio"]:checked + label {
          background: @btnColor;
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
      outline: none;
      border: none;
      width: 100%;
      height: 46px;
      font-size: 20px;
      border-radius: 100px;
      background-color: @btnColor;
      margin-bottom: 20px;
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

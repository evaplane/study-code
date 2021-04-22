<template>
  <div class="register-container">
    <el-form
      class="register-form"
      :model="form"
      :rules="rules"
      label-width="100px"
      ref="registerForm"
    >
      <div class="title-container">
        <img src="../static/1.jpg" alt="" />
      </div>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="验证码" class="captcha-container">
        <div class="captcha">
          <img :src="code.captcha" alt="" @click="resetCaptcha" />
        </div>
        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repasswd" label="确认密码">
        <el-input
          v-model="form.repasswd"
          type="password"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native取消默认时间 -->
        <el-button type="primary" @click.native="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  data() {
    return {
      form: {
        email: "844169876@qq.com",
        nickname: "eva",
        password: "a123456",
        repasswd: "a123456",
        captcha: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
          },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
          },
        ],
        password: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/,
            message: "请输入6-12位密码",
          },
        ],
        repasswd: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/,
            message: "请再次输入密码",
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次密码不一致"));
              }
              callback();
            },
          },
        ],
      },
      code: {
        captcha: "/api/captcha?_t" + new Date().getTime(),
      },
    };
  },
  methods: {
    resetCaptcha() {
      this.code.captcha = "/api/captcha?_t" + new Date().getTime();
    },
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log("校验成功");
          // @Todo 发送请求 jwt
          let obj = {
            email: this.form.email,
            password: md5(this.form.password),
            nickname: this.form.nickname,
            captcha: this.form.captcha,
          };
          let result = await this.$http.post("/user/register", obj);
          if (result.code === 0) {
            this.$alert("注册成功", "成功", {
              confirmButtonText: "去登陆",
              callback: () => {
                this.$router.push("/login");
              },
            });
          } else {
            this.$message.error(result.message);
          }
        } else {
          console.log("校验失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 100%;
  min-height: 100%;
}
.register-form {
  width: 520px;
  padding: 100px 0;
  margin: 0 auto;
}
.title-container {
  text-align: center;
}
.title-container img {
  width: 100px;
}
.captcha-container {
  position: relative;
  width: 50%;
}
.captcha-container .captcha {
  position: absolute;
  right: -100px;
}
</style>

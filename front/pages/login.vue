<template>
  <div>
    <el-form class="login-form">
      <el-form-item props="email">
        <span>
          <i class="el-icon-mobile"></i>
        </span>
        <el-input placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item props="email">
        <span>
          <i class="el-icon-lock"></i>
        </span>
        <el-input placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="验证码"></el-input>
        <img :src="captchaUrl" alt="" @click="updateCaptcha" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      captchaUrl: "",
    };
  },
  mounted() {
    this.updateCaptcha();
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t" + new Date().getTime();
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 800px;
  height: 50px auto;
}
</style>

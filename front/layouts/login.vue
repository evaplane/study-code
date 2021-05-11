<template>
  <div>
    登录
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style>
.login-container {
  width: 100%;
  min-height: 100%;
}
.login-form {
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
.captcha-container .el-button {
  width: 90px;
  padding: 0px;
  line-height: 40px;
}
</style>

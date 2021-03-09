# eva

> eva npm test
>
> 自己发布的npm包
>
> npm 的滚动小测试

## 安装

npm i eva-burn

## 使用

main.js 中引入

````bash
import eva from 'eva-burn'
Vue.use(eva)

页面中使用
​```bash
<template>
  <div id="app">
	<eva :val="msg"></eva>
  </div>
</template>
export default {
  name: "app",
  data() {
    return {
      msg:
        "eva哈哈哈",
    };
  }
};
````



// network中发起了log.js网络请求
// import {log} from "./log.js";
// log("main.js")


// 单纯写这句话会报错，因为直接从浏览器中获取要有./ / ../ 报错信息如下
// localhost/:1 Uncaught TypeError: Failed to resolve module specifier "vue".
// Relative references must start with either "/", "./", or "../".
// import {ref,watchEffect} from "vue";

// let count = ref(0);


// watchEffect(()=>{
// 	console.log(count.value);
// })

// count.value++;

// 3.引入template和js
import {createApp} from "vue";
import App from "./App.vue";
import "./index.css";

createApp(App).mount("#app");
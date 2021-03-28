import eva from "./eva.vue";

// 组件需要添加name属性，代表注册的组件名称，也可以修改成其他的
eva.install = (Vue) => Vue.component(eva.name, eva); //注册组件

export default eva;

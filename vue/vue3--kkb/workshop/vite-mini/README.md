

1.利用浏览器自带的module import功能，来实现文件的加载

2.支持import vue
	原理：从node_modules里面获取

	2.1 import xx from "vue" 改造成 import xx from "@modules/vue"

	2.2 把import xx from "@modules/vue"解析,koa拦截然后去node_modules里找
		找到 node_modules --> vue -->package.json -->module下面对应的文件然后return

	2.3 报错：shared:380 Uncaught ReferenceError: process is not defined
		process为了区别dev和production
		可以直接把dev注入全局就可以，可以用js注入

3.支持单文件组件
	只有js和template
	3.1 解析.vue文件
		export default解析为__script对象
		把template和style变成了两个额外的网络请求，render拼在组件上，export default即可

	解决：compiler-sfc 


4.支持css,vite怎么支持ts，怎么热更新
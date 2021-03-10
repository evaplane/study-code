# pref-demo

### 七牛云CDN
- 所有CDN都可以修改图片的格式和大小，七牛云上直接修改
- build打包,node模拟后台，实际NGINX，compression中间件压缩
- 防止重复打包：
	tree-shaking
	可以优化的方式
		1.ctrl+shift+p => show covrage => 文件利用率 unUsedBytes
		2.performance 


### ssr
1.网络层面：dns预解析，缓存设定，打包策略设定
	dns的prefetch是很成熟的解决方案
2.响应层面：
	TTI：5s内少于两次响应
3.解析层面：
	DOM Parse
	render

spa和ssr是介于响应和dom parse之间

首屏优化代码ssr.js
	vue3的渲染器 @vue/server-render

### 性能监控
1.从输入URL到页面显示都发生了什么
2.navigation-timing-2  主要了解process的图
3.mutationObserver

上面三个的了解来计算性能
	dns
	responseTime
	白屏时间
	首屏时间
	dom解析时间
	...

#### FMP的计算（first meaningful time）
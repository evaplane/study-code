/**
 * 安装阶段
 * 		通常预缓存appShell
 * 	1.Service Worker会注册监听install事件
 * 	2.当Service Worker注册成功之后，install事件触发，会执行回调
 * 	
 */
this.addEventListener("install",function(event){
	// 返回的参数作为 event.waitUntil 方法的参数，控制这个阶段的流程，只有传给他参数，这个阶段才会结束
	event.waitUntil(
		// 开辟一块跟Service Worker对应的缓存区域，返回一个Promise,成功以后触发then回调函数
		caches.open("my-cache-v1").then(function(caches){
			// caches为杠杆开辟的缓存区域，addAll方法缓存指定的文件列表
			// 返回Promise对象
			// 如果所有的对象都缓存成功，resolve安装成功，如果任意支源缓存失败，reject安装失败，就无法激活
			// 如果预缓存列表过长，就会增加缓存失败概率
			return caches.addAll([
				"/",
				"/test.js",
				"test.css"
			])
		})
	);
	
})

/**
 * 激活阶段
 * 		通常这个阶段，主要操作是让新的Service Worker尽快获得对作用域的控制以及清理与旧的Service Worker相关的缓存资源
 * 		activate事件的触发，就意味着当前的Service Worker即将获得他注册作用域的控制权
 */
this.addEventListener("activate",function(event){
	event.waitUntil(
		Promise.all([
		// 让正在激活的Service Worker获得claim的完全控制权
		// 完全控制权：理论上Service Worker激活之后应该是可以控制页面了，但仅仅能够作用在注册成功之后打开的页面，也就是说，首次激活Service Worker
		// 之前，页面加载的时候，一开始是没有被Service Worker控制的，当Service Worker激活运行之后，页面需要被重新加载才能让Service Worker获得完全
		// 控制，否则无法进行拦截请求
		// this.clients.claim()方法就是跳过刷新页面的步骤，让Service Worker可以立即具备所有正常的功能
		this.clients.claim(),

		/**
		 * 在获得控制权之后，就会遍历cache中的缓存列表
		 */
		caches.keys().then(function(cachesList){
			return Promise.all(
				// 如果发现cacheName不匹配的，缓存就会被丢弃
				cachesList.map(function(cacheName){
					if(cacheName != "my-cache-v1"){
						return caches.delete(cacheName);
					}
				})
			)
		})
	]))
	
})
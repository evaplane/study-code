// install 只要service worker触发了就会重新触发
self.addEventListener("install",event=>{
	// 让service worker跳过等待，直接进入activate状态，异步
	event.waitUntil(self.skipWaiting());
	console.log("install",event);
})

// activate
self.addEventListener("activate",event=>{
	// service worker在初始被注册的时候，页面在下次加载之前不会使用他，claim()方法会立即控制这些页面
	// 表示夺到了控制权之后再去下一个请求
	event.waitUntil(self.clients.claim());
	console.log("activate",event);
})

// 加载的资源都会被fetch获取到,在请求发送的时候触发
self.addEventListener("fetch",event=>{
	console.log("fetch",event);
})
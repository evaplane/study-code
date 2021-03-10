// 注册三个事件
/**
 * install阶段缓存内容
 */
const CACHE_NAME="cache_v1";
self.addEventListener("install",async ()=>{
	// 1.开启一个cache缓存，得到一个cache对象，可以存储资源
	const cache = await caches.open(CACHE_NAME);
	// 2.等待cache把所有的资源都存储起来
	// localhost缓存的不是index.html，而是/
	await cache.addAll([
		"/",
		"./images/demo.jpg",
		"./manifest.json",
		"./index.css"
	])
	// 3.跳到activate阶段
	await self.skipWaiting();
	// event.waitUntil(self.skipWaiting());
})

/**
 * 清除旧的缓存
 */
self.addEventListener("activate",async ()=>{
	// 可以获取到所有资源的key
	const keys = await caches.keys();
	keys.forEach(key=>{
		if(key !== CACHE_NAME){
			caches.delete(key);
		}
	})
	await self.clients.claim();
	// event.waitUntil(self.clients.claim())
})


/**
 * fetch事件会在请求发送的时候触发
 * 如果断网的情况下，就可以在cache中把缓存读取出来
 * 判断资源是否能够请求成功，如果能够就响应成功的结果，如果请求失败，就读取cache缓存的内容
 */
self.addEventListener("fetch",event=>{
	// 请求对象
	const req = event.request;
	// 把响应通过event.respondWith返回给浏览器
	event.respondWith(networkFirst(req));
})

// 网络优先
// 先从网络读取资源，网络有就获取网络，没有获取缓存
async function networkFirst(req){
	try{
		// 读取网络
		const fresh = await fetch(req);
		return fresh;
	}catch(e){
		// 读取失败去缓存中读取
		const cache = await caches.open(CACHE_NAME);
		const cached = await cache.match(req);
		return cached;
	}
}

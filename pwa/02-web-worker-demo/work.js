// 要求计算1-1亿之间的和
// 注意：web worker是一个独立的线程，不能操作DOM和BOM
// 适合做大量运算
let total = 0;
for (let i = 0; i <= 1000000; i++) {
	total += i;
}


// 发消息给主线程
self.postMessage({total:total});

// 监听message事件
self.addEventListener("message",e=>{})
if("serviceWorker" in navigator){
	// 要延迟注册ServiceWorker
	/**
	 *     在首次访问页面的时候，浏览器并不知道有哪些资源需要加载，也不知道有一个工作服务线程在等待创建，如果在页面加载的过程中，浏览器在下载
	 * 资源文件或者图片的进程或者线程之外，还要为Service Worker创建一个线程，那么对于一些移动设备，甚至一些低端的手机来说，这些额外的线程就加剧了
	 * 对性能的消耗，以及抢占了正常资源的带宽，使用Service Worker的最终目标是要提升用户体验，在首次加载页面的时候，我们的首要任务是要尽快加载关键渲染
	 * 路径下的资源，减少白屏时间，那么创建线程拖慢页面展示速度不是我们想要的结果，因此我们需要延迟注册Service Worker
	 */
	window.addEventListener("load",function(){
		/**
		 * register方法会返回一个Promice对象
		 * 		参数1：指定即将安装Service Worker脚本文件的位置
		 * 		参数2：对象，scope属性用来指定Service Worker控制的域 
		 * 		
		 * 		如果不设置scope，默认情况下，Service Worker指定的作用域就是sw.js父级目录所在的路径，只能捕获到父级路径下面的页面所发出的请求
		 * 	注册的规则是在指定scope的时候不能越域，不允许指定scope为默认作用域的上级域或者旁级域甚至不是同源的域
		 *  	例外：如果服务端给注册Service Worker的文件设置了 service-worker-allowed:"/"的头部信息，指定了允许Service Worker工作的最大的域，
		 *  如果我们在注册的时候跨域了，只要这个域在allowed header指定的最大的域的范围内，注册将会成功
		 * 		一个域名可以注册多个Service Worker，只要注册的scope不一样，这些Service Worker分管不同的域，一般没有冲突，注册之后会生成一个独立的
		 * 	Service Worker上下文
		 */
		navigator.serviceWorker.register("/statis/sw-demo.js",{
			"scope":"/static/"
		}).then(function(registration){

		})
		.catch(function(error){

		})
	})
}


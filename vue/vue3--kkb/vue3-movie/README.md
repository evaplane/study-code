# vue3-movie

### 1. 首页
		跳转页面
		import useRouter from "vue-router"
### 2. navbar 
		用到了inject和provide
		vuex完成 back的显示和隐藏
			getters,类似于computed，通过mapGetters展开
			computed:{
				...mapGetters([
					"doneToDoCount"
				])
			}
### 3. 列表list页面
		3.1 获取参数 
			import {useRoute} from "vue-router"
			const route = useRoute()
			通过route获取
		
		3.2 返回按钮
			在onBeforeMounted和unBeforeUnMounted钩子里控制Vuex
			mutations的调用
			导入vuex：useStore
			返回上个页面 $router.go(-1)

		
	4. 

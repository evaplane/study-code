# vue3-demo 在vue2.x的项目中使用vue3

## 步骤
	1. vue create vue3-demo (选择Vuex和router)
	2. npm install @vue/composition-api 

## 语法
	1. setup函数，执行机制在beforeCreate和created之间，参数：props和context
	2. 响应式 ：reactive({})，如果要return响应式，加上toRefs,ref如果要在setup中修改或者获取要用.value
	3. computed:有缓存
		3.1 写在setup内部 const double = computed(()=>state.num*2)
		3.2 写在reactive内部  
			const state = {
				num:1,
				double : computed(()=>state.num *2)
			}
	4. watch
	5. watchEffect:立即执行一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数
	6. 生命周期函数
		setup() 相当于beforeCreate和created
		onBeforeMount => beforeMount
		onMounted => mounted
		onBeforeUpdate => beforeUpdate
		onUpdated => updated
		onBeforeUnmount => beforeDestory
		onUnmounted => destoryed
		onErrorCaptured => errorCaptured

		生命周期钩子不用导出，因为是vue自己调用的
	7. 组件间传值
		7.1 props
		7.2 provide和inject
			可以实现多级传递
	8. slot的使用
		8.1 匿名插槽
		8.2 具名插槽
		8.3 slot 和 slot-scope （已弃用）
		8.4 v-slot 
			语法：子组件 :aa = "title" name="eva"
				  父组件  template v-slot:eva="data"
				  		{{data.aa}}






vue2.x和vue3.x语法可以共存
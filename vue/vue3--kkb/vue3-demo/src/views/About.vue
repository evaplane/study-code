<template>
  <div class="about">
    <h1>This is an about page</h1>
	<p>{{msg}}</p>
	<p>{{msg2}}</p>
	<p>{{msg3}}</p>
	<p>{{doubleNum}}</p>
	<p>{{num}} * 2 = {{double}}</p>
	<button @click="changeMsg">click</button>
	<button @click="add">add</button>
	<!-- <Test :msg="msg2" /> -->
	<Test />
  </div>
</template>
<script>
import Test from "@/components/Test.vue";
import {ref,reactive,toRefs,computed,watch, watchEffect,onMounted,onUnmounted,provide} from "@vue/composition-api";
const ThemeSymbol = Symbol();
export default {
	components:{
		Test
	},
	data(){
		return {
			msg:"对不起，我是一个警察"
		}
	},
	beforeCreate(){
		// console.log("beforeCreate")
	},
	setup() {
		// reactive接受一个普通对象然后返回该普通对象的响应式代理，证明返回的对象不是响应式的，要用toRefs包裹一下
		// 就是说实际上没有通过proxy的处理，只有toRefs才会处理
		const state = reactive({
			msg2:"你是一个大坏蛋",
			num:1,
			doubleNum:computed(()=>state.num*3)
		})
		const msg3 =ref("加油加油");
		const msg4 =ref("加油加油1");
		const count = ref(0);
		watch(()=>state.num,(num,prevNum)=>{
			// console.log(num)
		})
		watch([msg3,msg4],([msg3,msg4],[prevMsg3,prevMsg4])=>{
			// console.log(msg3)
			// console.log(msg4)
			// console.log(prevMsg3)
			// console.log(prevMsg4)
		})

		const stop = watchEffect((onInvalidate)=>{
			onInvalidate=>{
				// console.log("清除副作用")
			}
			// return console.log(count.value)
		})
		// 调用stop的作用是停止侦听。正常是打印0,1, 如果在这个位置调用stop，就不会打印1
		stop();
		setTimeout(()=>{
			count.value++;
		},1000)
		
		const changeMsg = ()=>{
			state.msg2 = "你是一个大花旦"
			msg3.value = "不加油" 
			msg4.value = "不加油111" 
		}
		const add = ()=>{
			state.num++
		}
		const double = computed(()=>state.num*2)

		onMounted(()=>{
			// console.log("-----onMounted-----")
		})

		onUnmounted(()=>{
			// console.log("--------onUnmounted------------")
		})

		const s = Symbol()
		const themeRef = ref('dark')
		provide(
			ThemeSymbol,themeRef
		)

		return {msg3,...toRefs(state),changeMsg,add,double}
	},
	

}
</script>

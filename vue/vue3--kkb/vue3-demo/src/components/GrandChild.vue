<template>
	<div>
		我是孙子组件 --- {{myMsg}}
	</div>
</template>
<script>
import {inject, reactive,ref, watchEffect} from "@vue/composition-api";
const ThemeSymbol = Symbol()
export default {
	setup(){
		const state = reactive({
			myMsg:inject(ThemeSymbol,ref("light"))
		})
		watchEffect(()=>{
			console.log(state.myMsg)
		})
		return {...state}
	}
}
</script>
<template>
	<div>
		子组件---{{myMsg}}
		<GrandChild />
	</div>
</template>
<script>
import GrandChild from "./GrandChild.vue"
import {reactive,inject,ref} from '@vue/composition-api';
const ThemeSymbol = Symbol()
export default {
	components:{
		GrandChild
	},
	// props:["msg"],
	setup(props){	
		// 组件间传值
		const state = reactive({
			// myMsg:props.msg
			myMsg:inject(ThemeSymbol,ref("pink"))
		})

		return {...state}
	}
}
</script>
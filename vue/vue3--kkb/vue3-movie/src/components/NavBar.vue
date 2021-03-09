<template>
	<div class="navbar">
		<i class="iconfont icon-4" v-show="$store.getters.getIsShowBack" @click="$router.go(-1)"></i>
		{{title}}
	</div>
</template>
<script>
import {inject} from "vue"
export default {
	setup(){
		const title = inject("title")
		return {title}
	}
}
</script>
<style lang="scss" scoped>
	.navbar {
		height: 44px;
		line-height: 44px;
		width: 100%;
		background-color: #42bd56;
		text-align: center;
		color: #fff;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
	}
	.icon-4 {
	  position: absolute;
	  left: 10px;
	  font-size: 20px;
	}
</style>
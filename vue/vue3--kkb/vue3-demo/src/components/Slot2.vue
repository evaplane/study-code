<template>
	<div>
		我是slot2
		<slot name="eva" :aa="title"></slot>
	</div>
</template>
<script>
export default {
	data(){
		return {
			title:"eva的标题"
		}
	}
}
</script>
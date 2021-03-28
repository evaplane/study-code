<template>
<div>	
	<span>我是slotTest</span>
	<slot :user="haha" name="test">你好啊</slot>
	<slot name="header"></slot>
</div>
	
</template>
<script>
export default {
	data(){
		return {
			haha:[
				{name: 'Jack', sex: 'boy'},
       		 	{name: 'Jone', sex: 'girl'},
        		{name: 'Tom', sex: 'boy'}
			]
		}
	}
}
</script>
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
	<!-- 子组件放进来，p里面的内容就是子组件插槽的内容 -->
	我是父组件
	 <slot1>
      <p style="color:red">我是父组件插槽内容</p>
	  <template slot="header">
			<p>我是name为header的slot</p>
		</template>
		 编译作用域 
	  {{msg}}

	  <template slot-scope="data" slot="test">
		  <div v-for="(item,index) in data.user" :key="index">
			  {{ item.name }} -- {{item.sex}}
		  </div>
	  </template>
    </slot1> 

	<!-- 这里的data是所有属性的集合 v-slot代替了原来的slot和slot-scope 
		语法：v-slot:插槽名称=组件内部绑定作用域值的映射
	 -->
	<slot2>
		<template v-slot:eva="data">
			<div>
				eva content
				<p>{{data.aa}}</p>
			</div>
		</template>
	</slot2>
	
	
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import slot1 from "@/components/SlotTest.vue"
import slot2 from "@/components/Slot2.vue"

export default {
  name: 'Home',
  components: {
    HelloWorld,
	slot1,
	slot2
  },
  data(){
	  return {
		  msg:"我是信息1"
	  }
  }
}
</script>

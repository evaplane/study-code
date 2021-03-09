<template>
	<div>
		<h1>{{name}}count is {{count}}</h1>
		<h2>double is {{double}}</h2>
		<button @click="add">click</button>
	</div>
</template>
<script>
// 这个写法，很好的支持了tree-shaking，除去无用的代码
import { ref, computed, onMounted, watchEffect } from "vue";
export default {
	// option api
	data() {
		return {
			name: "eva"
		};
	},

	// composition api
	setup() {
		const { count, double, add } = useCount(1);
		return { count, double, add };
	}
};

// 可以完成最简单的代码复用，取代vue2的mixin

function useCount(init) {
	let count = ref(init);
	function add() {
		count.value++;
	}
	onMounted(() => {
		console.log("onMount");
	});

	watchEffect(() => {
		console.log("watchEffect");
	});
	const double = computed(() => count.value * 2);
	return { count, double, add };
}
</script>
<style>
	h1{
		color:red;
	}
</style>

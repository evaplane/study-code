<template>
	<input
		:class="{fixed:top>10}"
		type="text"
		v-model="state.newTodo"
		@keyup.enter="addNewTodo"
	/>
	<ul>
		<li
			v-for="todo in state.todos"
			:key="todo.id"
		>{{todo.title}}</li>
	</ul>
</template>

<script>
import { reactive, watchEffect } from "vue";
import useScroll from "./components/scroll.js";
export default {
	name: "app",
	setup() {
		// 滚动的时候input悬浮
		const state = reactive({
			newTodo: "",
			todos: [
				{ id: "1", title: "周末", computed: false },
				{ id: "2", title: "学习vue3", computed: false },
				{ id: "3", title: "吃火锅", computed: false },
				{ id: "4", title: "吃火锅", computed: false },
				{ id: "5", title: "吃火锅", computed: false },
				{ id: "6", title: "吃火锅", computed: false },
				{ id: "7", title: "吃火锅", computed: false },
				{ id: "8", title: "吃火锅", computed: false },
				{ id: "9", title: "吃火锅", computed: false },
				{ id: "10", title: "吃火锅", computed: false },
				{ id: "11", title: "吃火锅", computed: false }
			]
		});

		function addNewTodo() {
			const val = state.newTodo;
			if (!val) {
				return;
			}
			state.todos.push({
				id: state.todos.length + 1,
				title: val,
				computed: false
			});
			state.newTodo = "";
			watchEffect(() => {
				console.log(state);
				console.log(top);
			});
		}

		const { top } = useScroll();
		return { state, addNewTodo, top };
	}
};
</script>
<style>
.fixed {
	position: fixed;
	top: 20px;
	left: 20px;
}
ul li {
	height: 200px;
}
</style>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";

const store = useStore();
const syntaxContent = computed(() => {
	const css = store.getters.css;
	const result = css.map(({ key, val }, index) => {
			const tabIndent = 1;
			const content = `<span class="red">--${ key }</span>: <span class="yellow">${ val }</span>;` + (index < css.length - 1 ? "\n" : "");

			return { tabIndent, content };
		});
	result.unshift('<span class="red">:root</span> {')
	result.push('}');

	return result;
});

console.log(store.getters.twResult)
</script>
<template>
	<SyntaxViewer :lineContent="syntaxContent" :tabSize="4" />
</template>

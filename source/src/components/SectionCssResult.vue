<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";
import { buildTemplate } from "@/modules/syntaxViewerTemplating";

const store = useStore();

const template = `
<span class="red">:root</span> {
<--DIVIDER-->
}`;

const syntaxContent = computed(() => {
	const css = store.getters.css;
	const result = css.map(({ key, val }, index) => {
		const tabIndent = 1;
		const content = `<span class="red">--${ key }</span>: <span class="yellow">${ val }</span>;` + (index < css.length - 1 ? "\n" : "");

		return { tabIndent, content };
	});

	const { header, footer } = buildTemplate(template);
	return [...header, ...result, ...footer];
});
</script>
<template>
	<SyntaxViewer :lineContent="syntaxContent" :tabSize="4" />
</template>

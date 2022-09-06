<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";
import { buildTemplate } from "@/modules/syntaxViewerTemplating";

const store = useStore();

const template = `
<red>:root</red> {
<--DIVIDER-->
}`;

const syntaxContent = computed(() => {
	const css = store.getters.css;
	const result = css.map(({ key, val }, index) => {
		const tabIndent = 1;
		const content = `<red>--${ key }</red>: <yellow>${ val }</yellow>;` + (index < css.length - 1 ? "\n" : "");

		return { tabIndent, content };
	});

	const { header, footer } = buildTemplate(template);
	return [...header, ...result, ...footer];
});

const onCompress = content => {
	return content.join("").replace(/(\s|\n)/g, "");
};
</script>
<template>
	<SyntaxViewer :lineContent="syntaxContent" :tabSize="4" :acceptCompress="true" :onCompress="onCompress" />
</template>

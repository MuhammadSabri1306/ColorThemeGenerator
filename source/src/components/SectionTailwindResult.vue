<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";
import { buildTemplate } from "@/modules/syntaxViewerTemplating";

const store = useStore();

const template = `
<comment>// tailwind.config.js</comment>
<red>module</red>.exports = {
\tcontent: [<green>'./src/**/*.{html,js}'</green>],
\ttheme: {
\t\tcolors: {
\t\t\ttransparent: <green>'transparent'</green>,
\t\t\tcurrent: <green>'currentColor'</green>,
<--DIVIDER-->
\t\t},
\t\textend: {}
\t},
\tplugins: []
}`;

const buildContent = (key, val, useComma = true) => {
	if(typeof key == "number")
		key = `<green>'${ key }'</green>`;
	val = `<green>'${ val }'</green>`;
	const comma = useComma ? "," : "";

	return  key + ": " + val + comma;
};

const syntaxContent = computed(() => {
	const { black, white, ranges } = store.getters.twResult;
	const result = [];

	result.push({ tabIndent: 3, content: buildContent("black", black) });
	result.push({ tabIndent: 3, content: buildContent("white", white) });

	ranges.forEach((rItem, rIndex) => {
		result.push({ tabIndent: 3, content: rItem.key + ": {" });
		rItem.val.forEach(({ key, val }, index) => {
			const tabIndent = 4;
			const content = buildContent(Number(key), val, index < rItem.val.length - 1)
			result.push({ tabIndent, content });
		});
		result.push({ tabIndent: 3, content: "}" + (rIndex < ranges.length - 1 ? "," : "") });
	});

	const { header, footer } = buildTemplate(template);
	return [...header, ...result, ...footer];
});
</script>
<template>
	<section>
		<SyntaxViewer :lineContent="syntaxContent" :tabSize="2" />
	</section>
</template>

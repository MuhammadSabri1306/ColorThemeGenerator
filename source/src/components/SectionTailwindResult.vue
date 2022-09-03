<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";
import { buildTemplate, buildContent } from "@/modules/syntaxViewerTemplating";

const store = useStore();

const template = `
<span class="comment">// tailwind.config.js</span>
<span class="red">module</span>.exports = {
\tcontent: [<span class="green">'./src/**/*.{html,js}'</span>],
\ttheme: {
\t\tcolors: {
\t\t\ttransparent: <span class="green">'transparent'</span>,
\t\t\tcurrent: <span class="green">'currentColor'</span>,
<--DIVIDER-->
\t\t},
\t\textend: {}
\t},
\tplugins: []
}`;

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

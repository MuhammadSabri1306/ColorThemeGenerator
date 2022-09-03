<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SyntaxViewer from "./ui/SyntaxViewer.vue";

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

const buildTemplate = () => {
	let [header, footer] = template.split("<--DIVIDER-->");

	const toLine = template => template.split("\n")
		.filter(item => item.length > 0)
		.map(item => {
			const tabArr = item.match(/\t/g);

			const tabIndent = tabArr ? tabArr.length : 0,
				content = item.replace(/\t/g, "");
			return { tabIndent, content };
		});

	header = toLine(header);
	footer = toLine(footer);
	return { header, footer };
};

const buildContent = (key, val, useComma = true) => {
	if(typeof key == "number")
		key = `<span class="green">'${ key }'</span>`;
	val = `<span class="green">'${ val }'</span>`;
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

	const { header, footer } = buildTemplate();
	return [...header, ...result, ...footer];
});
</script>
<template>
	<section>
		<SyntaxViewer :lineContent="syntaxContent" :tabSize="2" />
	</section>
</template>

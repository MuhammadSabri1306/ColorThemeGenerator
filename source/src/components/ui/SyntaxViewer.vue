<script setup>
import { ref, computed } from "vue";
import copyHtmlToClipboard from "@/modules/copyHtmlToClipboard";
import { DuplicateIcon } from "@heroicons/vue/outline";

const props = defineProps({
	lineContent: { type: Array, default: [] },
	tabSize: { type: Number, default: 2 }
});

/*
 * copyStatus
 *   -1 = default, 0 = fail, 1 = success
 */
const copyStatus = ref(-1);
const setCopyStatus = statusCode => {
	copyStatus.value = statusCode;
	if(statusCode >= 0)
		setTimeout(() => copyStatus.value = -1, 2000);
};

const codeElm = ref(null);
const copy = () => {
	const copyStatus = copyHtmlToClipboard(codeElm.value) ? 1 : 0;
	setCopyStatus(copyStatus);
};

const content = computed(() => {
	return props.lineContent
		.map(lineItem => {
			if(typeof lineItem === "string")
				return lineItem;

			const { content, tabIndent } = lineItem;
			if(!content)
				return "";
			if(!tabIndent)
				return content;
			return "&nbsp;".repeat(tabIndent * props.tabSize) + content;
		})
		.join("<br>");
});
</script>
<template>
	<div class="syntax-viewer">
		<div class="flex-1 overflow-x-auto px-8 md:px-12 lg:px-16 pt-8 pb-8">
			<code ref="codeElm" v-html="content" class="whitespace-nowrap w-fit text-gray-300 text-[0.9em]"></code>
		</div>
		<button @click="copy" class="absolute right-2 top-2 inline-flex text-sm font-semibold text-gray-500 bg-transparent transition-colors duration-200 ease-in-out hover:text-gray-400 hover:bg-gray-900/50 focus:outline-none focus:text-indigo-400">
			<span v-if="copyStatus === 1">Copied</span>
			<span v-else-if="copyStatus === 0">Failed</span>
			<DuplicateIcon class="w-6 h-6 mr-1" />
		</button>
	</div>
</template>
<style scoped>
.syntax-viewer { @apply relative bg-gray-900 border border-black rounded-lg; }
.syntax-viewer :deep(.red) { @apply text-red-400; }
.syntax-viewer :deep(.blue) { @apply text-blue-400/80; }
.syntax-viewer :deep(.yellow) { @apply text-yellow-500/90; }
.syntax-viewer :deep(.green) { @apply text-green-400/80; }
.syntax-viewer :deep(.purple) { @apply text-violet-400; }
.syntax-viewer :deep(.comment) { @apply text-gray-500; }
</style>
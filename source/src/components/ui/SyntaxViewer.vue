<script setup>
import { ref, computed, watch } from "vue";
import copyHtmlToClipboard from "@/modules/copyHtmlToClipboard";
import { DuplicateIcon } from "@heroicons/vue/outline";
import IconLoader from "@/components/IconLoader.vue";

defineEmits(["compress"]);
const props = defineProps({
	lineContent: { type: Array, default: [] },
	tabSize: { type: Number, default: 2 },
	acceptCompress: { type: Boolean, default: false },
	onCompress: Function
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

const isCompressed = ref(false);
const compress = () => isCompressed.value = !isCompressed.value;

const buildLineHighlight = lineItem => {
	["red", "blue", "yellow", "green", "purple", "comment"].forEach(color => {
		const finder = [`<${ color }>`, `</${ color }>`],
			replacer = [`<span class="${ color }">`, `</span>`];

		lineItem = lineItem.replaceAll(finder[0], replacer[0]).replaceAll(finder[1], replacer[1]);
	});

	return lineItem;
};

const content = computed(() => {
	if(isCompressed.value){
		const lineContent = props.lineContent.map(lineItem => {
			if(typeof lineItem === "string")
				return lineItem;
			const { content } = lineItem;

			return content ? content : "";
		});

		const compressedLineContent = props.onCompress(lineContent);
		return buildLineHighlight(compressedLineContent);
	}

	return props.lineContent
		.map(lineItem => {
			if(typeof lineItem === "string")
				return buildLineHighlight(lineItem);

			const { content, tabIndent } = lineItem;
			if(!content)
				return "";
			if(!tabIndent)
				return buildLineHighlight(content);
			return "&nbsp;".repeat(tabIndent * props.tabSize) + buildLineHighlight(content);
		})
		.join("<br>");
});
</script>
<template>
	<div class="syntax-viewer">
		<div :class="[isCompressed ? 'pt-12' : 'pt-8']" class="flex-1 overflow-x-auto px-8 md:px-12 lg:px-16 pb-8">
			<code ref="codeElm" v-html="content" class="whitespace-nowrap w-fit text-gray-300 text-[0.9em]"></code>
		</div>
		<div class="absolute right-0 top-0 py-2 px-2 md:px-4">
			<div class="flex justify-end">
				<button v-if="acceptCompress" @click="compress" class="p-2 bg-gray-900/80 border transition-colors duration-200 ease-in-out border-transparent focus:border-indigo-600 text-gray-400 hover:text-white focus:text-indigo-600 focus:outline-none">
					<IconLoader icon="solid-arrows-pointing-in" v-show="!isCompressed" class="w-6 h-6" />
					<IconLoader icon="solid-arrows-pointing-out" v-show="isCompressed" class="w-6 h-6" />
				</button>
				<button @click="copy" class="text-sm font-semibold p-2 bg-gray-900/80 border transition-colors duration-200 ease-in-out border-transparent focus:border-indigo-600 text-gray-400 hover:text-white focus:text-indigo-600 focus:outline-none">
					<DuplicateIcon class="w-6 h-6" />
				</button>
			</div>
			<p v-if="copyStatus === 0" class="text-xs font-bold text-red-600 text-right mt-1">Failed</p>
			<p v-else-if="copyStatus === 1" class="text-xs font-bold text-indigo-600 text-right mt-1">Copied</p>
		</div>
	</div>
</template>
<style scoped>
::-webkit-scrollbar { @apply lg:w-3 lg:h-3; }
::-webkit-scrollbar-track { @apply lg:bg-transparent; }
::-webkit-scrollbar-thumb { @apply lg:bg-gray-800 rounded-lg; }
::-webkit-scrollbar-thumb:hover { @apply lg:bg-gray-700; }

.syntax-viewer { @apply relative bg-gray-900 border border-black rounded-lg; }
.syntax-viewer :deep(.red) { @apply text-red-400; }
.syntax-viewer :deep(.blue) { @apply text-blue-400/80; }
.syntax-viewer :deep(.yellow) { @apply text-yellow-500/90; }
.syntax-viewer :deep(.green) { @apply text-green-400/80; }
.syntax-viewer :deep(.purple) { @apply text-violet-400; }
.syntax-viewer :deep(.comment) { @apply text-gray-500; }
</style>
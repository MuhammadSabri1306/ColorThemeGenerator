<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import PanelCodeEditor from "./PanelCodeEditor.vue";
import copyHtmlToClipboard from "./modules/copyHtmlToClipboard";

const codeEditor = ref(null);
const store = useStore();
const rangesColor = computed(() => store.getters.css);

const copyCode = () => {
	const copyStatus = copyHtmlToClipboard(codeContent.value) ? 1 : 0;
	codeEditor.value.setCopyStatus(copyStatus);
};

// console.log(store.getters.css);
</script>
<template>
	<PanelCodeEditor ref="codeEditor" @copy=copyCode>
<pre ref="codeContent"><span class="red">:root</span> {
<span v-for="(item, index) in rangesColor">  <span class="red">--{{ item.key }}</span>: <span class="yellow">{{ item.val }}</span>;<br v-if="index < (rangesColor.length - 1)"></span>
}</pre>
	</PanelCodeEditor>	
</template>

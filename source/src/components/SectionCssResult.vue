<script>
import PanelCodeEditor from "./PanelCodeEditor.vue";
import copyHtmlToClipboard from "./modules/copyHtmlToClipboard";

export default {
	components: { PanelCodeEditor },
	computed: {
		colors(){
			return this.$store.getters.colorsResult;
		},
		rangesColor(){
			return this.$store.getters.cssResult;
		}
	},
	methods: {
		copyCode(){
			const copyStatus = copyHtmlToClipboard(this.$refs.codeContent) ? 1 : 0;
			this.$refs.codeEditor.setCopyStatus(copyStatus);
		}
	}
};
</script>
<template>
	<PanelCodeEditor ref="codeEditor" @copy=copyCode>
<pre ref="codeContent"><span class="red">:root</span> {
<span v-for="(item, index) in rangesColor">  <span class="red">--{{ item.key }}</span>: <span class="yellow">{{ item.val }}</span>;<br v-if="index < (rangesColor.length - 1)"></span>
}</pre>
	</PanelCodeEditor>	
</template>

<script>
import PanelCodeEditor from "./PanelCodeEditor.vue";
import copyHtmlToClipboard from "./../services/copyHtmlToClipboard";

export default {
	components: { PanelCodeEditor },
	data(){
		return {
			colors: {},
			hasInit: false
		};
	},
	computed: {
		rangesColor(){
			if(!this.hasInit)
				return [];

			const colors = [];
			Object.entries(this.colors).forEach(([ name, item ]) => {
				if(name == "black" || name == "white"){
					colors.push({ key: name, value: item });
					return;
				}

				Object.entries(item).forEach(([ key, val ]) => {
					const colorName = name + "-" + key;
					colors.push({ key: colorName, value: val });
				});
			});

			return colors;
		}
	},
	methods: {
		init(colors){
			this.colors = colors;
			this.hasInit = true;
		},
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
<span v-for="(item, index) in rangesColor">  <span class="red">--{{ item.key }}</span>: <span class="yellow">{{ item.value }}</span>;<br v-if="index < (rangesColor.length - 1)"></span>
}</pre>
	</PanelCodeEditor>	
</template>

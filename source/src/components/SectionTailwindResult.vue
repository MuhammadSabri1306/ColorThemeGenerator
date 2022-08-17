<script>
import PanelCodeEditor from "./PanelCodeEditor.vue";
import copyHtmlToClipboard from "./modules/copyHtmlToClipboard";

export default {
	components: { PanelCodeEditor },
	computed: {
		base(){
			const { black, white } = this.$store.getters.twResult;
			return { black, white };
		},
		rangesColor(){
			return this.$store.getters.twResult.ranges;
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
	<section>
		<PanelCodeEditor ref="codeEditor" @copy=copyCode>
<pre ref="codeContent"><span class="comment">// tailwind.config.js</span>
<span class="red">module</span>.exports = {
  content: [<span class="green">'./src/**/*.{html,js}'</span>],
  theme: {
    colors: {
      transparent: <span class="green">'transparent'</span>,
      current: <span class="green">'currentColor'</span>,
<span class="green">      'black'</span>: <span class="green">'{{ base.black }}'</span>
<span class="green">      'white'</span>: <span class="green">'{{ base.white }}'</span>,
<span v-for="(item, index) in rangesColor"><br v-if="index > 0"><span class="green">      '{{ item.key }}'</span>: {
<span v-for="(childItem, childIndex) in item.val"><br v-if="childIndex > 0"><span class="green">        '{{ childItem.key }}'</span>: <span class="green">'{{ childItem.val }}'</span><span v-if="childIndex < (item.val.length - 1)">,</span></span>
      }<span v-if="index < (rangesColor.length - 1)">,</span></span>
    extend: {}
  },
  plugins: []
}</pre>
		</PanelCodeEditor>
	</section>
</template>

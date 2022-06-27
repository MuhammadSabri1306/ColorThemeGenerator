<script>
import { DuplicateIcon } from "@heroicons/vue/outline";

export default {
	components: { DuplicateIcon },
	emits: ["copy"],
	data(){
		return {
			copyStatus: -1
		}
	},
	methods: {
		setCopyStatus(status){
			this.copyStatus = status;
			if(status >= 0)
				setTimeout(() => this.copyStatus = -1, 2000);
		}
	}
};
</script>
<template>
	<div class="code-editor">
		<div class="flex-1 overflow-x-auto px-8 md:px-12 lg:px-16 pt-8 pb-8">
			<p class="code-editor-content">
				<slot></slot>
			</p>
		</div>
		<button class="absolute right-2 top-2 inline-flex text-sm font-semibold text-gray-500 bg-transparent transition-colors duration-200 ease-in-out hover:text-gray-400 hover:bg-gray-900/50 focus:outline-none focus:text-indigo-400" @click="$emit('copy')">
			<DuplicateIcon class="w-6 h-6 mr-1" />
			<span v-if="copyStatus == 1">Copied</span>
			<span v-if="copyStatus == 0">Failed</span>
		</button>
	</div>
</template>

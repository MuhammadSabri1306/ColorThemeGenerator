<script>
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";

export default {
	components: { ChevronUpIcon, ChevronDownIcon },
	emits: ["change"],
	props: {
		value: String,
		title: String,
		list: Array
	},
	data(){
		return {
			showOptions: false
		};
	},
	computed: {
		text(){
			return Boolean(this.value) ? this.value : this.title;
		},
		content(){
			if(!Boolean(this.list)) return this.list;
			return this.list.map(item => {
				const { value, disabled } = item;
				const selected = value == this.value;
				const text = item.text ? item.text : item.value;

				return { value, selected, disabled, text };
			});
		}
	},
	methods: {
		listItemClass(selected, disabled){
			if(selected)
				return ["bg-indigo-600", "text-white"];
			if(disabled)
				return ["bg-gray-200", "text-gray-600"]
			return ["bg-white", "text-gray-700", "transition-colors", "duration-200", "ease-in-out", "hover:bg-gray-100"];
		},
		lostFocus(e){
			if(!Boolean(e.relatedTarget))
				this.showOptions = false;
		},
		changeValue(val){
			this.showOptions = false;
			this.$emit('change', val);
		}
	}
};
</script>
<style scoped>
	button { cursor: default; }
</style>
<template>
	<div>
		<button type="button" class="relative block px-4 py-2 min-w-[12rem] border rounded-md border-gray-300 text-gray-700 bg-white text-left hover:border-gray-400 focus:outline-none" @click="showOptions = !showOptions" @focusout="lostFocus">
			<span>{{ text }}</span>
			<div class="absolute top-0 right-4 bottom-0 flex flex-col justify-center items-center">
				<ChevronUpIcon class="w-4 h-4 text-gray-500 -mb-1" />
				<ChevronDownIcon class="w-4 h-4 text-gray-500" />
			</div>
		</button>
		<div v-if="showOptions" class="relative">
			<div class="absolute top-2 left-0 min-w-[12rem] border rounded-md border-gray-300 shadow-sm flex flex-col items-stretch z-[8899]">
				<button type="button" class="custom-option text-sm font-semibold bg-gray-200 text-gray-600 text-left py-1 px-4" disabled>{{ title }}</button>
				<button v-for="item in content" type="button" @click="changeValue(item.value)" class="custom-option text-sm font-semibold text-left py-1 px-4" :disabled="item.disabled || item.selected" :class="listItemClass(item.selected, item.disabled)">{{ item.text }}</button>
			</div>
		</div>
	</div>
</template>

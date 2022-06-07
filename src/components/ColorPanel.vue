<script>
import ColorRange from "./../services/ColorRange";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/solid";
import ColorInput from "./ColorInput.vue";

const testColor = new ColorRange({
	range: 10,
	colors: {
		100: "#f5f5f4",
		900: "#1c1917"
	}
});

console.log(testColor.generate());

export default {
	components: { LockClosedIcon, LockOpenIcon, ColorInput },
	props: {
		title: String,
		lock: Boolean,
		defaultColors: Array,
		isEditable: Boolean,
		useNextButton: Boolean
	},
	emits: ['saveColors'],
	data(){
		return {
			colors: {},
			isLocked: false
		};
	},
	created(){
		this.initData();
	},
	methods: {
		initData(){
			this.colors = {};
			this.defaultColors.forEach(dColor => {
				this.colors[dColor.name] = dColor.hex;
			});

			this.isLocked = false;
			this.isLocked = this.lock;
		},
		changeIsLocked(){
			this.isLocked = !this.isLocked;
		},
		changeColor(colorName, colorValue){
			this.colors[colorName] = colorValue;
		},
		saveColors(){
			this.$emit('saveColors', this.colors);
			this.isLocked = true;
		}
	}
};
</script>
<style scoped>
	.closed-icon, .open-icon {
		@apply w-4 h-4 transition-colors duration-200 ease-in-out;
	}
</style>
<template>
	<div class="color-panel" :class="{ 'disabled': !isEditable }">
		<div class="flex justify-between items-start">
			<h4 class="text-lg font-bold leading-6 text-gray-700 sm:text-xl sm:truncate">{{ title }}</h4>
			<button type="button" @click="changeIsLocked()" :disabled="!isEditable">
				<LockClosedIcon v-if="isLocked" class="closed-icon text-gray-500" :class="{ 'hover:text-gray-600': isEditable }" />
				<LockOpenIcon v-if="!isLocked" class="open-icon text-gray-400" :class="{ 'hover:text-gray-600': isEditable }" />
			</button>
		</div>
		<div class="flex flex-wrap justify-start items-start py-4">
			<ColorInput v-for="(colorVal, colorName) in colors" :colorName="colorName" :color="colorVal" :isDisabled="!isEditable || isLocked" @changeColor="changeColor" />
		</div>
		<div v-if="useNextButton" class="flex justify-end mt-8">
			<button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white" :class="{ 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500': isEditable }" @click="saveColors()">Next</button>
		</div>
	</div>
</template>

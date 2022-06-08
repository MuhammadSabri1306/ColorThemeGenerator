<script>
import ColorInput from "./ColorInput.vue";
import ColorCircle from "./ColorCircle.vue";

export default {
	components: { ColorInput, ColorCircle },
	emits: ["submit"],
	props: {
		title: String,
		defaultColors: Object,
		hasInit: Boolean
	},
	data(){
		return {
			blackColor: "",
			whiteColor: ""
		};
	},
	created(){
		this.setupDefaultColors();
	},
	methods: {
		setupDefaultColors(){
			this.blackColor = this.defaultColors.black;
			this.whiteColor = this.defaultColors.white;
		},
		changeColor(colorName, colorValue){
			if(colorName == "Black")
				this.blackColor = colorValue;
			else if(colorName == "White")
				this.whiteColor = colorValue;
		},
		submitColors(){
			this.$emit('submit', {
				black: this.blackColor,
				white: this.whiteColor
			});
		}
	}
};
</script>
<template>
	<div class="color-panel">
		<div v-if="!hasInit">
			<h4 class="text-xl md:text-lg truncate font-bold leading-6 text-gray-700">{{ title }}</h4>
			<div class="flex flex-wrap justify-start items-start py-4">
				<ColorInput colorName="Black" :color="blackColor" @changeColor="changeColor" />
				<ColorInput colorName="White" :color="whiteColor" @changeColor="changeColor" />
			</div>
			<div class="flex justify-end mt-8">
				<button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="submitColors">Start</button>
			</div>
		</div>
		<div v-else class="flex items-start col-span-full">
			<h4 class="text-xl md:text-lg truncate font-bold leading-6 text-gray-700 mr-8">{{ title }}</h4>
			<ColorCircle :color="blackColor" label="Black" :circleClassList="['w-8', 'h-8']" :labelClassList="['text-gray-600', 'font-sm', 'font-semibold']" labelPosition="left" class="mr-4" />
			<ColorCircle :color="whiteColor" label="White" :circleClassList="['w-8', 'h-8']" :labelClassList="['text-gray-600', 'font-sm', 'font-semibold']" labelPosition="left" />
		</div>
	</div>
</template>

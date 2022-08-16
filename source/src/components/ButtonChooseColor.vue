<script>
import FormChooseColor from "./FormChooseColor.vue";

export default {
	components: { FormChooseColor },
	props: {
		colorName: String,
		color: String,
		isDisabled: Boolean
	},
	emits: ['changeColor'],
	data(){
		return {
			showFormChooseColor: false
		};
	},
	methods: {
		changeColor(colorValue){
			this.$emit('changeColor', this.colorName, colorValue);
			this.showFormChooseColor = false;
		}
	}
};
</script>
<style scoped>
	button[disabled] { opacity: 1!important; }
</style>
<template>
	<div class="flex flex-col items-center m-2">
		<button @click="showFormChooseColor = true" type="button" class="rounded-full w-16 h-16 border border-gray-300 btn-hovered-shadow" :name="colorName" :style="{ backgroundColor: color }" :disabled="isDisabled"></button>
		<label v-if="colorName" for="colorName" class="text-gray-600 font-semibold text-sm mt-2">{{ colorName }}</label>
	</div>
	<FormChooseColor v-if="showFormChooseColor" :defaultValue="color" @submit="changeColor" @cancel="showFormChooseColor = false" />
</template>

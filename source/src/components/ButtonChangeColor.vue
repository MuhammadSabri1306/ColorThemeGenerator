<script setup>
import { ref } from "vue";
import FormChooseColor from "./FormChooseColor.vue";

const props = defineProps({
	colorName: String,
	color: String,
	isDisabled: Boolean
});

const emit = defineEmits(["changeColor"]);
const showFormChooseColor = ref(false);

const changeColor = colorValue => {
	emit("changeColor", props.colorName, colorValue);
	showFormChooseColor.value = false;
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

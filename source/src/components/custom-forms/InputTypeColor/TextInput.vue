<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";

const props = defineProps({
	hex: String,
	rgb: Object
});
const emit = defineEmits(["change"]);
const color = reactive({ hex: "", rgb: {} });

watch(() => props.hex, hex => color.hex = hex);
watch(() => props.rgb, rgb => color.rgb = rgb);

onBeforeMount(() => {
	color.hex = props.hex;
	color.rgb = props.rgb;
})

const type = ["hex", "rgb"];
const typeIndex = ref(0);
const getType = () => {
	const type = ["hex", "rgb"];
	return type[typeIndex.value] ? type[typeIndex.value] : type[0];
};
const changeType = () => typeIndex.value += (typeIndex.value == type.length - 1) ? -(typeIndex.value) : 1;

const hexChange = e => {
	const hex = e.target.value;

	if(hex[0] != "#")
		hex = "#" + hex;

	if(hex.length <= 7){
		for(let i = hex.length; i < 7; i++){
			hex = hex + "0";
		}
	}
	else hex = hex.slice(0, 7);

	emit("change", { hex });
};

const changeRGB = ({ r, g, b }) => {
	const rgb = {
		r: r ? r.replace(/\D/g, "") : color.rgb.r,
		g: g ? g.replace(/\D/g, "") : color.rgb.g,
		b: b ? b.replace(/\D/g, "") : color.rgb.b
	};

	emit("change", { rgb });
};
const rgbRChange = e => changeRGB({ r: e.target.value });
const rgbGChange = e => changeRGB({ g: e.target.value });
const rgbBChange = e => changeRGB({ b: e.target.value });
</script>
<template>
	<div class="flex items-center">
		<div v-if="getType() == 'hex'" class="grow grid labelled-input-wrapper after:content-['HEX']">
			<input :value="color.hex" @change="hexChange" @keyup.enter="hexChange" type="text" class="input-color-text" autocomplete="off">
		</div>
		<div v-if="getType() == 'rgb'" class="grow grid grid-cols-3 gap-1 md:gap-4">
			<div class="labelled-input-wrapper after:content-['R']">
				<input :value="color.rgb.r" @change="rgbRChange" @keyup.enter="rgbRChange" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['G']">
				<input :value="color.rgb.g" @change="rgbGChange" @keyup.enter="rgbGChange" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['B']">
				<input :value="color.rgb.b" @change="rgbBChange" @keyup.enter="rgbBChange" type="text" class="input-color-text" autocomplete="off">
			</div>
		</div>
		<button @click="changeType" type="button" class="flex flex-col justify-center items-center ml-4 md:px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none">
			<ChevronUpIcon class="w-4 h-4 -mb-1" />
			<ChevronDownIcon class="w-4 h-4" />
		</button>
	</div>
</template>
<style scoped>
	.labelled-input-wrapper {
		@apply relative after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:mt-1 after:text-gray-600 after:text-xs after:font-semibold;
	}
	.input-color-text {
		@apply px-1 md:px-4 py-1 text-center w-full border rounded-md border-gray-300 text-gray-700 bg-white text-left hover:border-gray-400 focus:outline-none;
	}
</style>
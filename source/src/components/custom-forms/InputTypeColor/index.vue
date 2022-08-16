<script setup>
import { ref, computed, onBeforeMount } from "vue";
import W3Color from "../../../store/lib/W3Color";
import Picker from "./Picker.vue";
import HueSlider from "./HueSlider.vue";
import TextInput from "./TextInput.vue";

const props = defineProps({ defaultValue: String });
const emit = defineEmits(["change"]);
const color = ref(null);

const colorHsv = computed(() => color.value.toHsv());
const colorHex = computed(() => color.value.toHexString());
const colorRgb = computed(() => color.value.toRgb());

onBeforeMount(() => {
	const colorDefault = props.defaultValue ? props.defaultValue : "#ff0000";
	color.value = new W3Color("hex", [colorDefault]);
});

const onPickerChange = ({ left, top }) => {
	const hsv = [colorHsv.value.h, left, 100 - top];
	color.value = new W3Color("hsv", hsv);
	
	emit("change", color.value.toHexString());
};

const onHueSliderChange = hue => {
	color.value = new W3Color("hsv", [hue, colorHsv.value.s, colorHsv.value.v]);
	emit("change", color.value.toHexString());
};

const onTextInputChange = ({ hex, rgb }) => {
	if(hex)
		color.value = new W3Color("hex", [hex]);
	else if(rgb)
		color.value = new W3Color("rgb", [rgb.r, rgb.g, rgb.b]);

	emit("change", color.value.toHexString());
};
</script>
<style scoped>
input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 1rem;
	height: 1.5rem;
	background: transparent;
	cursor: pointer;
	border: 0.25rem solid #fff;
	border-radius: 0.25rem;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
}

input[type="range"]::-moz-range-thumb {
	-moz-appearance: none;
	appearance: none;
	width: 1rem;
	height: 1.5rem;
	background: transparent;
	cursor: pointer;
	border: 0.25rem solid #fff;
	border-radius: 0.25rem;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
}
</style>
<template>
	<div>
		<Picker :hue="colorHsv.h" :left="colorHsv.s" :top="100 - colorHsv.v" @change="onPickerChange" />
		<div class="grid grid-cols-[1fr_2fr]">
			<div class="aspect-square border border-gray-300 rounded-full shadow-sm mr-4" :style="{ background: colorHex }"></div>
			<div class="mt-2">
				<HueSlider :hue="colorHsv.h" class="mb-4" @change="onHueSliderChange" />
				<TextInput :hex="colorHex" :rgb="colorRgb" @change="onTextInputChange" />
			</div>
		</div>
	</div>
</template>
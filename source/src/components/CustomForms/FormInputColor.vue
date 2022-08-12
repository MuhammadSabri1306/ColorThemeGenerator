<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import W3Color from "./../../services/W3Color";

const emit = defineEmits(["change"]);
const props = defineProps({ defaultValue: String });
const color = ref(null);

const hue = ref(0);
const postX = ref(100);
const postY = ref(0);

const wrapper = ref(null);
const isPickerDrag = ref(false);
const isHueRangeSlide = ref(false);

onBeforeMount(() => {
	color.value = new W3Color("hex", [props.defaultValue || "#ff0000"]);
	const { h, s, v } = color.value.toHsv();

	hue.value = h;
	postX.value = s;
	postY.value = 100 - v;
});

const bgGradient = computed(() => {
	return `linear-gradient(to left, hsl(${ hue.value }deg, 100%, 50%), hsl(${ hue.value }deg, 0%, 100%))`;
});

const bgHue = () => {
	let bg = "linear-gradient(to right";
	for(let i=0; i<=360; i++){
		bg += ", hsl(" + i + "deg, 100%, 50%)";
	}
	bg += ")";
	return { background: bg };
};

const pickerPostStyles = computed(() => {
	return {
		left: postX.value + "%",
		top: postY.value + "%",
		transform: `translate(-${ 30 + postX.value / 2 }%, -${ 30 + postY.value / 2 }%)`
	};
});

// Color Picker

const movePicker = (x, y, err = null) => {
	const { left, right, top, bottom, width, height } = wrapper.value.getBoundingClientRect();

	if(x < left)
		postX.value = 0;
	else if(x > right)
		postX.value = 100;
	else
		postX.value = (x - left) / width * 100;

	if(y < top)
		postY.value = 0;
	else if(y > bottom)
		postY.value = 100;
	else
		postY.value = (y - top) / height * 100;
};

const endDragPicker = () => {
	isPickerDrag.value = false;

	color.value = new W3Color("hsv", [hue.value, postX.value, 100 - postY.value]);
	emit("change", color.value.toHexString());
};

const startDragPicker = event => {
	isPickerDrag.value = true;
	movePicker(event.clientX, event.clientY, endDragPicker);
};

const dragPicker = event => {
	if(!isPickerDrag.value) return;
	movePicker(event.clientX, event.clientY);

	color.value = new W3Color("hsv", [hue.value, postX.value, 100 - postY.value]);
	emit("change", color.value.toHexString());
};

// Hue Slider
const startSlideHueRange = () => isHueRangeSlide.value = true;

const endSlideHueRange = () => {
	isHueRangeSlide.value = false;
	emit("change", color.value.toHexString());
};

const slideHueRange = value => {
	hue.value = value;
	color.value = new W3Color("hsv", [hue.value, postX.value, 100 - postY.value]);
	emit("change", color.value.toHexString());
};

// Color Picker & Hue Slider events

const onMove = e => {
	isPickerDrag.value && dragPicker(e);
	isHueRangeSlide.value && slideHueRange(e.target.value);
};

const onUp = () => {
	isPickerDrag.value && endDragPicker();
};

document.body.addEventListener("mousemove", onMove);
document.body.addEventListener("mouseup", onUp);
document.body.addEventListener("touchmove", onMove);
document.body.addEventListener("touchend", onUp);
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
		<div ref="wrapper" @mousedown="startDragPicker" @touchstart="startDragPicker" class="relative aspect-[2/1] cursor-move mb-8 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-black before:to-transparent" :style="{ background: bgGradient }">
			<div class="absolute w-4 h-4 border-2 border-gray-100 rounded-full shadow-[0_0_0.5rem_rgba(0,0,0,0.4)]" :style="pickerPostStyles"></div>
		</div>
		<div class="grid grid-cols-[1fr_2fr]">
			<div class="aspect-square border border-gray-300 rounded-full shadow-sm mr-4" :style="{ background: color.toHexString() }"></div>
			<div class="mt-2">
				<div class="flex items-center mb-4">
					<input @mousedown="startSlideHueRange" @change="endSlideHueRange" type="range" name="hueRange" min="0" max="360" :value="hue" class="appearance-none h-4 grow cursor-pointer focus:outline-none" :style="bgHue()">
					<span class="w-10 text-right text-gray-600">{{ hue }}</span>
				</div>
				<p class="border border-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.4) rounded text-center text-gray-700 py-1 px-3">{{ color.toHexString() }}</p>
			</div>
		</div>
	</div>
</template>

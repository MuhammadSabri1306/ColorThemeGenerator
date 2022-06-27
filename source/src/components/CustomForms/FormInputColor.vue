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
		top: postY.value + "%"
	};
});

const movePicker = (x, y, err = null) => {
	const offset = wrapper.value.getBoundingClientRect();
	
	const outCheck = [{
		condition: x < offset.left,
		callback: () => postX.value = 0
	}, {
		condition: x > offset.right,
		callback: () => postX.value = 100
	}, {
		condition: y < offset.top,
		callback: () => postY.value = 0
	}, {
		condition: y > offset.bottom,
		callback: () => postY.value = 100
	}].filter(checker => {
		if(checker.condition === true)
			checker.callback();
		return checker.condition;
	}).length;

	if(outCheck > 0){
		err && err();
		return;
	}

	postX.value = (x - offset.left) / offset.width * 100;
	postY.value = (y - offset.top) / offset.height * 100;
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

const startSlideHueRange = () => isHueRangeSlide.value = true;
const endSlideHueRange = () => isHueRangeSlide.value = false;
const slideHueRange = event => {
	if(!isHueRangeSlide.value) return;
	hue.value = event.target.value;
	color.value = new W3Color("hsv", [hue.value, postX.value, 100 - postY.value]);
};

document.body.addEventListener("mouseup", () => {
	isPickerDrag.value && endDragPicker();
	isHueRangeSlide.value && endSlideHueRange();
});

if(event.touches === 1){
	document.body.addEventListener("touchend", () => {
		isPickerDrag.value && endDragPicker();
		isHueRangeSlide.value && endSlideHueRange();
	});
}
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
		<div ref="wrapper" @mousedown="startDragPicker" @touchstart="startDragPicker" @mousemove="dragPicker" @touchmove="dragPicker" class="relative aspect-[2/1] cursor-move mb-8 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-black before:to-transparent" :style="{ background: bgGradient }">
			<div class="absolute w-4 h-4 border-2 border-gray-100 rounded-full shadow-[0_0_0.5rem_rgba(0,0,0,0.4)] -translate-x-1/2 -translate-y-1/2" :style="pickerPostStyles"></div>
		</div>
		<div class="grid grid-cols-[1fr_2fr]">
			<div class="aspect-square border border-gray-300 rounded-full shadow-sm mr-4" :style="{ background: color.toHexString() }"></div>
			<div class="mt-2">
				<div class="flex items-center mb-4">
					<input @mousedown="startSlideHueRange" @touchstart="startSlideHueRange" @mousemove="slideHueRange" @touchmove="slideHueRange" type="range" name="hueRange" min="0" max="360" :value="hue" class="appearance-none h-4 grow cursor-pointer focus:outline-none" :style="bgHue()">
					<span class="w-10 text-right text-gray-600">{{ hue }}</span>
				</div>
				<p class="border border-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.4) rounded text-center text-gray-700 py-1 px-3">{{ color.toHexString() }}</p>
			</div>
		</div>
	</div>
</template>

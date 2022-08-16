<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";

const props = defineProps({
	hue: Number,
	left: Number,
	top: Number
});

const emit = defineEmits(["change"]);

const hue = ref(props.hue);
const pickerLeft = ref(null);
const pickerTop = ref(null);
const isPickerDrag = ref(false);
const colorBox = ref(null);

watch(() => props.hue, h => hue.value = h);

onBeforeMount(() => {
	pickerLeft.value = props.left;
	pickerTop.value = props.top;
});

const bgGradient = computed(() => {
	return `linear-gradient(to left, hsl(${ hue.value }deg, 100%, 50%), hsl(${ hue.value }deg, 0%, 100%))`;
});

const pickerPostStyles = computed(() => {
	const left = pickerLeft.value + "%";
	const top = pickerTop.value + "%";
	const transform = `translate(-${ 30 + pickerLeft.value / 2 }%, -${ 30 + pickerTop.value / 2 }%)`;

	return { left, top, transform };
});

const movePicker = (x, y) => {
	if(!isPickerDrag.value)
		return;

	const { left, right, top, bottom, width, height } = colorBox.value;
	pickerLeft.value = (x < left) ? 0 : (x > right) ? 100 : (x - left) / width * 100;
	pickerTop.value = (y < top) ? 0 : (y > bottom) ? 100 : (y - top) / height * 100;

	emit("change", { left: pickerLeft.value, top: pickerTop.value });
};

const startDragPicker = event => {
	isPickerDrag.value = true;
	colorBox.value = event.target.getBoundingClientRect();
	
	movePicker(event.clientX, event.clientY);
};

const endDragPicker = event => {
	isPickerDrag.value = false;
	movePicker(event.clientX, event.clientY);
};

const dragPicker = event => isPickerDrag.value && movePicker(event.clientX, event.clientY);

document.body.addEventListener("mousemove", dragPicker);
document.body.addEventListener("touchmove", dragPicker);
document.body.addEventListener("mouseup", endDragPicker);
document.body.addEventListener("touchend", endDragPicker);
</script>
<template>
	<div @mousedown="startDragPicker" @touchstart="startDragPicker" class="relative aspect-[2/1] cursor-move mb-8 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-black before:to-transparent" :style="{ background: bgGradient }">
		<div class="absolute w-4 h-4 border-2 border-gray-100 rounded-full shadow-[0_0_0.5rem_rgba(0,0,0,0.4)]" :style="pickerPostStyles"></div>
	</div>
</template>
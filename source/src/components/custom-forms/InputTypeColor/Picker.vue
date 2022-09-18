<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
	hue: Number,
	left: { type: Number, default: 100 },
	top: { type: Number, default: 100 }
});

const emit = defineEmits(["change"]);
const hue = computed(() => props.hue);
const pickerLeft = ref(props.left);
const pickerTop = ref(props.top);
const isPickerDrag = ref(false);

const pickerWatchers = {
	source: () => ({ left: props.left, top: props.top }),
	callback: ({ left, top }) => {
		pickerLeft.value = left;
		pickerTop.value = top;
	}
};

watch(pickerWatchers.source, pickerWatchers.callback);

const colorBoxElm = ref(null);
const colorBox = computed(() => {
	const width = !colorBoxElm.value ? 0 : colorBoxElm.value.offsetWidth,
		height = !colorBoxElm.value ? 0 : colorBoxElm.value.offsetHeight,
		left = !colorBoxElm.value ? 0 : colorBoxElm.value.offsetLeft,
		top = !colorBoxElm.value ? 0 : colorBoxElm.value.offsetTop;
	const right = left + width,
		bottom = top + height;

	return { width, height, left, top, right, bottom };
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

const isTouchEvent = event => ["touchstart", "touchmove", "touchend"].indexOf(event.type) >= 0;

const getCursorPost = event => {
	if(!isTouchEvent(event))
		return { x: event.clientX, y: event.clientY };

	const evt = (typeof event.originalEvent === 'undefined') ? event : event.originalEvent;
    const touch = evt.touches[0] || evt.changedTouches[0];
    return { x: touch.pageX, y: touch.pageY };
};

const startDragPicker = event => {
	isPickerDrag.value = true;
	const { x, y } = getCursorPost(event);
	movePicker(x, y);
};

const endDragPicker = event => {
	isPickerDrag.value = false;
	const { x, y } = getCursorPost(event);
	movePicker(x, y);
};

const dragPicker = event => {
	if(!isPickerDrag.value)
		return;
	const { x, y } = getCursorPost(event);
	movePicker(x, y);
};

onMounted(() => {
	document.body.addEventListener("mousemove", dragPicker);
	document.body.addEventListener("mouseup", endDragPicker);
	document.body.addEventListener("touchmove", dragPicker);
	document.body.addEventListener("touchend", endDragPicker);

	if(document.body.style.overflow == "auto")
		document.body.style.overflow = "hidden";
});

onUnmounted(() => {
	document.body.removeEventListener("mousemove", dragPicker);
	document.body.removeEventListener("mouseup", endDragPicker);
	document.body.removeEventListener("touchmove", dragPicker);
	document.body.removeEventListener("touchend", endDragPicker);

	if(document.body.style.overflow == "hidden")
		document.body.style.overflow = "auto";
});
</script>
<template>
	<div ref="colorBoxElm" @mousedown="startDragPicker" @touchstart="startDragPicker" class="relative aspect-[2/1] cursor-move mb-8 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-black before:to-transparent" :style="{ background: bgGradient }">
		<div class="absolute w-4 h-4 border-2 border-gray-100 rounded-full shadow-[0_0_0.5rem_rgba(0,0,0,0.4)]" :style="pickerPostStyles"></div>
	</div>
</template>
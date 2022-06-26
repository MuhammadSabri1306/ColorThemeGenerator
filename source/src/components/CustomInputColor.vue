<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import W3Color from "./../services/W3Color";

const emit = defineEmits(["change"]);
const props = defineProps({ defaultValue: String });
const color = ref(null);

const hue = ref(0);
const postX = ref(100);
const postY = ref(0);

const isDrag = ref(false);
const wrapper = ref(null);

onBeforeMount(() => {
	const colorValue = props.defaultValue || "#ff0000";
	color.value = new W3Color("hsl", [0, 100, 50]);
	const { h, s, v } = color.value.toHsv();

	hue.value = h;
	postX.value = s;
	postY.value = 100 - v;
});

const bgGradient = computed(() => {
	return `linear-gradient(to left, hsl(${ hue.value }deg, 100%, 50%), hsl(${ hue.value }deg, 0%, 100%))`;
});

const pickerPostStyles = computed(() => {
	return {
		left: postX.value + "%",
		top: postY.value + "%"
	};
});

const move = (x, y, err) => {
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
		err();
		return;
	}

	postX.value = (x - offset.left) / offset.width * 100;
	postY.value = (y - offset.top) / offset.height * 100;
};

const endDrag = () => {
	isDrag.value = false;

	color.value = new W3Color("hsv", [hue.value, postX.value, 100 - postY.value]);
	emit("change", color.value.toHexString());
};

const startDrag = event => {
	isDrag.value = true;
	move(event.clientX, event.clientY, endDrag);
};

const drag = event => {
	if(!isDrag.value) return;
	move(event.clientX, event.clientY, endDrag);
};
</script>
<template>
	<div>
		<div ref="wrapper" @mousedown="startDrag" @mouseup="endDrag" @mousemove="drag" class="relative aspect-[2/1] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-black before:to-transparent" :style="{ background: bgGradient }">
			<div class="absolute w-4 h-4 border-2 border-gray-100 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0.5rem_rgba(0,0,0,0.4)]" :style="pickerPostStyles"></div>
		</div>
		<div class="mt-8">
			<button @click="test" class="px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">OK</button>
		</div>
	</div>
</template>

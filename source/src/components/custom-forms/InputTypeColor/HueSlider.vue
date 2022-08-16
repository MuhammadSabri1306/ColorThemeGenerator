<script setup>
import { ref, watch, onBeforeMount } from "vue";

const props = defineProps({ hue: Number });
const emit = defineEmits(["change"]);
const hue = ref(null);

watch(() => props.hue, h => hue.value = h);

const styleBg = () => {
	let background = "linear-gradient(to right";
	for(let i=0; i<=360; i++){
		background += ", hsl(" + i + "deg, 100%, 50%)";
	}
	background += ")";
	return { background };
};

onBeforeMount(() => hue.value = props.hue);

const isSlide = ref(false);
const startSlide = () => isSlide.value = true;
const endSlide = () => isSlide.value = false;
const slide = event => {
	if(!isSlide.value)
		return;

	emit("change", event.target.value);
};

document.body.addEventListener("mousemove", slide);
document.body.addEventListener("touchmove", slide);
</script>
<template>
	<div class="flex items-center">
		<input @mousedown="startSlide" @change="endSlide" type="range" name="hueRange" min="0" max="360" :value="hue" class="appearance-none h-4 rounded-[1rem] grow cursor-pointer focus:outline-none" :style="styleBg()">
		<span class="w-10 text-right text-gray-600">{{ hue }}</span>
	</div>
</template>
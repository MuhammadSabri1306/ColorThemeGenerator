<script setup>
import { ref, reactive, watch, computed } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/solid";

const roundHsv = ({ h, s, v }) => ({ h: Math.round(h), s: Math.round(s), v: Math.round(v) });

const props = defineProps({
	hex: String,
	rgb: Object,
	hsv: Object
});
const emit = defineEmits(["change"]);
const color = reactive({
	hex: props.hex,
	rgb: props.rgb,
	hsv: roundHsv(props.hsv)
});

const textInputWatchers = {
	hex: {
		source: () => props.hex,
		callback: hex => color.hex = hex
	},
	rgb: {
		source: () => props.rgb,
		callback: rgb => color.rgb = rgb
	},
	hsv: {
		source: () => props.hsv,
		callback: hsv => color.hsv = roundHsv(hsv)
	}
};

for(const key in textInputWatchers){
	watch(textInputWatchers[key].source, textInputWatchers[key].callback);
}

const type = ["hex", "rgb", "hsv"];
const typeIndex = ref(0);
const getType = () => type[typeIndex.value] ? type[typeIndex.value] : type[0];
const changeType = () => typeIndex.value += (typeIndex.value == type.length - 1) ? -(typeIndex.value) : 1;

const onHexChange = e => {
	let hex = e.target.value;

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

const formatNumberInput = val => val.replace(/\D/g, "");

const onRgbChange = {
	submit: ({ r, g, b }) => {
		const rgb = {
			r: r ? formatNumberInput(r) : color.rgb.r,
			g: g ? formatNumberInput(g) : color.rgb.g,
			b: b ? formatNumberInput(b) : color.rgb.b
		};

		emit("change", { rgb });
	},
	r: e => onRgbChange.submit({ r: e.target.value }),
	g: e => onRgbChange.submit({ g: e.target.value }),
	b: e => onRgbChange.submit({ b: e.target.value })
};

const onHsvChange = {
	submit: ({ h, s, v }) => {
		const hsv = {
			h: h ? formatNumberInput(h) : color.hsv.h,
			s: s ? formatNumberInput(s) : color.hsv.s,
			v: v ? formatNumberInput(v) : color.hsv.v
		};

		emit("change", { hsv });
	},
	h: e => onHsvChange.submit({ h: e.target.value }),
	s: e => onHsvChange.submit({ s: e.target.value }),
	v: e => onHsvChange.submit({ v: e.target.value })
};
</script>
<template>
	<div class="flex items-center">
		<div v-if="getType() == 'hex'" class="grow grid labelled-input-wrapper after:content-['HEX']">
			<input :value="color.hex" data-tabindex="0" @change="onHexChange" @keyup.enter="onHexChange" type="text" class="input-color-text" autocomplete="off">
		</div>
		<div v-else-if="getType() == 'rgb'" class="grow grid grid-cols-3 gap-1 md:gap-4">
			<div class="labelled-input-wrapper after:content-['R']">
				<input :value="color.rgb.r" data-tabindex="0" @change="onRgbChange.r" @keyup.enter="onRgbChange.r" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['G']">
				<input :value="color.rgb.g" data-tabindex="0" @change="onRgbChange.g" @keyup.enter="onRgbChange.g" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['B']">
				<input :value="color.rgb.b" data-tabindex="0" @change="onRgbChange.b" @keyup.enter="onRgbChange.b" type="text" class="input-color-text" autocomplete="off">
			</div>
		</div>
		<div v-else-if="getType() == 'hsv'" class="grow grid grid-cols-3 gap-1 md:gap-4">
			<div class="labelled-input-wrapper after:content-['H']">
				<input :value="color.hsv.h" data-tabindex="0" @change="onHsvChange.h" @keyup.enter="onHsvChange.h" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['S']">
				<input :value="color.hsv.s" data-tabindex="0" @change="onHsvChange.s" @keyup.enter="onHsvChange.s" type="text" class="input-color-text" autocomplete="off">
			</div>
			<div class="labelled-input-wrapper after:content-['V']">
				<input :value="color.hsv.v" data-tabindex="0" @change="onHsvChange.v" @keyup.enter="onHsvChange.v" type="text" class="input-color-text" autocomplete="off">
			</div>
		</div>
		<button @click="changeType" data-tabindex="0" type="button" class="flex flex-col justify-center items-center ml-4 md:px-4 py-2 text-gray-500 hover:text-gray-700 focus-color-default">
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
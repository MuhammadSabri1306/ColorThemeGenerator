<script setup>
import { ref, computed, watch } from "vue";
import { LockClosedIcon, LockOpenIcon, MinusCircleIcon } from "@heroicons/vue/solid";
import { TrashIcon } from "@heroicons/vue/outline";
import ButtonChangeColor from "./ButtonChangeColor.vue";
import ColorViewCircle from "./ui/ColorViewCircle.vue";
import ButtonAddColor from "./ButtonAddColor.vue";

const props = defineProps({
	title: String,
	lock: Boolean,
	name: String,
	color: Object,
	customizable: Boolean,
	destroyable: Boolean,
	editTitle: Boolean
});

const color = ref(props.color);
watch(() => props.color, c => color.value = c);

const emit = defineEmits(["setColor", "removeColor", "destroy", "updateTitle"]);
const isLocked = ref(false);
if(props.lock)
	isLocked.value = props.lock;

const colorCustom = computed(() => color.value.node);
const colorRange = computed(() => color.value.values);
const availableKey = computed(() => Object.keys(color.value.node));
const canUseAdd = computed(() => props.customizable && Object.keys(colorCustom.value).length < 9);
const canUseRemove = computed(() => props.customizable && Object.keys(colorCustom.value).length > 1);
const titleEditableClassList = computed(() => {
	if(!props.editTitle)
		return [];
	return ["border-b", "border-transparent", "transition-colors", "duration-200", "ease-in-out", "hover:border-gray-400", "focus:border-gray-400", "focus:outline-none"];
});

const switchIsLocked = () => isLocked.value = !isLocked.value;
const setColor = (key, val) => emit("setColor", { name: props.name, key, val });
const removeColor = key => emit("removeColor", { name: props.name, key });

const changeTitle = title => {
	if(title.length < 1)
		return false;
	title = title.replace(/[^a-z1-9]/gi, "").toLowerCase();
	emit("updateTitle", props.title.toLowerCase(), title);
	return true;
};

const titleOnKeyDown = event => {
	if(event.key != "Enter")
		return;
	event.preventDefault();

	const title = event.target.innerText;
	if(!changeTitle(title))
		event.target.innerText = props.title;
};

const titleOnBlur = event => {
	const title = event.target.innerText;
	if(!changeTitle(title))
		event.target.innerText = props.title;
};
</script>
<template>
	<div class="color-panel">
		<div class="flex justify-between items-start mb-12">
			<div class="flex items-center">
				<h4 class="text-xl lg:text-lg truncate font-bold leading-6 text-gray-700" :class="titleEditableClassList" :contenteditable="editTitle" @keydown="titleOnKeyDown" @blur="titleOnBlur">{{ title }}</h4>
				<button type="button" class="ml-3 transition-colors duration-200 ease-in-out hover:text-gray-600" :class="{ 'text-gray-500': isLocked, 'text-gray-400': !isLocked }" @click="switchIsLocked">
					<LockClosedIcon v-if="isLocked" class="w-4 h-4" />
					<LockOpenIcon v-else class="w-4 h-4" />
				</button>
			</div>
			<button v-if="!isLocked && destroyable" type="button" class="text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-600 -mr-6 -mt-4" @click="$emit('destroy', name)" >
				<TrashIcon class="w-5 h-5" />
			</button>
		</div>
		<div v-if="isLocked" class="flex flex-wrap justify-start items-start mb-4">
			<ColorViewCircle v-for="(colorVal, colorKey) in colorCustom" :color="colorVal" :label="colorKey" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
		<div v-else class="flex flex-wrap justify-start items-start mb-4">
			<div v-for="(colorVal, colorKey) in colorCustom" class="relative">
				<ButtonChangeColor :colorName="colorKey" :color="colorVal" @changeColor="setColor" />
				<button v-if="canUseRemove" class="absolute top-0 right-0 text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-600" @click="removeColor(colorKey)">
					<MinusCircleIcon class="w-6 h-6" />
				</button>
			</div>
			<ButtonAddColor v-if="canUseAdd" :disabledKeys="availableKey" @add="setColor" />
		</div>
		<div class="flex flex-wrap justify-start items-start">
			<ColorViewCircle v-for="(colorVal, colorKey) in colorRange" :color="colorVal" :label="colorKey" :circleClassList="['w-12', 'h-12']" :labelClassList="['text-gray-600', 'text-sm', 'font-semibold']" class="m-2" />
		</div>
	</div>
</template>

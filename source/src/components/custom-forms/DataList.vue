<script setup>
import { ref, computed, nextTick } from "vue";
import searchAlgorithm from "@/modules/searchAlgorithm";
import moveCursorToEnd from "@/modules/moveCursorToEnd";
import { ChevronRightIcon } from "@heroicons/vue/solid";
import ColorViewCircle from "../ui/ColorViewCircle.vue";

const props = defineProps({ model: Array });
const emit = defineEmits(["cancel", "change"]);
const searchConfig = { highlight: true, marker: "<b>{value}</b>" };

const keyword = ref("");
const showSuggestions = ref(true);
const suggestingColor = computed(() => keyword.value.search(/([0-9])|(-)/) >= 0);

const getSuggestionClass = index => {
	return {
		'bg-gray-100': index == navigatedIndex.ref.value,
		'bg-white hover:bg-gray-100': index != navigatedIndex.ref.value,
		'border-t': index > 0
	};
};

const hideSuggestionsClass = computed(() => {
	return {
		hidden: keyword.value.length < 1 || !showSuggestions.value
	};
});

const suggestions = computed(() => {
	if(suggestingColor.value){
		const result = searchAlgorithm(keyword.value, props.model.map(item => item.name), searchConfig);
		return result.map((rItem, index) => {
			const twColor = props.model.find(mItem => mItem.name == rItem.value);
			const text = rItem.text;
			const isNavigated = navigatedIndex.value === index;
			return { ...twColor, text, isNavigated };
		});
	}

	const twList = props.model.map(item => item.name.replace(/-?[0-9]/g, ""));
	const result = searchAlgorithm(keyword.value, [...new Set(twList)], searchConfig);
	return result.map((rItem, index) => {
		return {
			name: rItem.value,
			text: rItem.text,
			color: null,
			isNavigated: navigatedIndex.value === index
		};
	});
});

const navigatedIndex = {
	ref: ref(-1),
	stepUp(){
		this.ref.value = (this.ref.value + 1 >= suggestions.value.length) ? -1 : this.ref.value + 1;
	},
	stepDown(){
		this.ref.value = (this.ref.value - 1 < -1) ? suggestions.value.length - 1 : this.ref.value - 1;
	},
	reset(){
		this.ref.value = -1;
	},
	onSuggestions(){
		return this.ref.value >= 0 && this.ref.value < suggestions.value.length;
	}
};

const navigations = {
	showSuggestions: () => showSuggestions.value = true,
	up: () => navigatedIndex.stepDown(),
	down: () => navigatedIndex.stepUp(),
	right: () => {
		keyword.value = suggestions.value[navigatedIndex.ref.value].name + "-";
		navigatedIndex.reset();
	},
	left: () => {
		keyword.value = suggestions.value[navigatedIndex.ref.value].name.replace(/[0-9]/g, "").replace(/-/g, "");
		navigatedIndex.reset();
	},
	enter: () => {
		const { name, color } = suggestions.value[navigatedIndex.ref.value];
		keyword.value = name;
		showSuggestions.value = false;
		emit("change", { name, color });
	}
};

const getNavigationName = key => {
	const navigation = [
		{ name: "showSuggestions", check: !showSuggestions.value },
		{ name: "up", checker: key == "ArrowUp" },
		{ name: "down", checker: key == "ArrowDown" },
		{ name: "right", checker: key == "ArrowRight" && navigatedIndex.onSuggestions() && !suggestingColor.value },
		{ name: "left", checker: event.key == "ArrowLeft" && navigatedIndex.onSuggestions() && suggestingColor.value },
		{ name: "enter", checker: key == "Enter" && navigatedIndex.onSuggestions() && suggestingColor.value }
	].find(nav => nav.checker === true);

	if(!navigation)
		return;
	return navigation.name;
};

const onFieldKeyDown = async (event) => {
	const navName = getNavigationName(event.key);
	if(navName){
		navigations[navName]();
		await nextTick();
		if(["left", "right", "enter"].indexOf(navName) >= 0)
			moveCursorToEnd(event.target);
		event.preventDefault();
	}
};

const onFieldKeyUp = async (event) => {
	const navName = getNavigationName(event.key);
	if(!navName)
		keyword.value = event.target.innerText;
};
</script>
<template>
	<div>
		<div class="grid grid-cols-1 mb-4 px-8">
			<div data-tabindex="0" @keydown="onFieldKeyDown" @keyup="onFieldKeyUp" @focus="showSuggestions = true" @blur="showSuggestions = false" contenteditable="true" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none">{{ keyword }}</div>
		</div>
		<div class="flex flex-col items-stretch z-[9999]" :class="hideSuggestionsClass">
			<button v-for="(twColor, index) in suggestions" :class="getSuggestionClass(index)" type="button" class="flex justify-between items-center border-x lg:border-r-0 border-gray-200 px-8 py-1" tabindex="-1">
				<span v-html="twColor.text" class="text-gray-500 text-sm font-semibold suggestion"></span>
				<ChevronRightIcon v-if="!suggestingColor" class="w-6 h-6 m-1 text-gray-500" />
				<ColorViewCircle v-else :color="twColor.color" :circleClassList="['w-8', 'h-8']" />
			</button>
		</div>
	</div>
</template>
<style>
	.suggestion b {
		@apply font-black text-gray-600;
	}
</style>
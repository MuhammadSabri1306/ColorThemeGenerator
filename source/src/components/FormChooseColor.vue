<script setup>
import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import customTabIndex from "./modules/customTabIndex";

import FixedModal from "./ui/FixedModal.vue";
import ColorViewCircle from "./ui/ColorViewCircle.vue";
import DataList from "./custom-forms/DataList.vue";
import InputTypeColor from "./custom-forms/InputTypeColor/index.vue";

const emit = defineEmits(["submit", "cancel"]);
const props = defineProps({ defaultValue: String });
const store = useStore();

const selectedTwName = ref(null);

const tabIndexOrder = ["input[type='text']"];
const { customTabIndexRef } = customTabIndex("data-tabindex");

const tabs = ["twPalette", "customColor"];
const activeTabsIndex = ref(0);
const getActiveTabs = () => tabs[activeTabsIndex.value];
const setActiveTabs = tabsName => {
	const index = tabs.indexOf(tabsName);
	if(activeTabsIndex.value == index)
		return;
	if(index >= 0)
		activeTabsIndex.value = index;
};

const value = computed(() => store.getters["colorPicker/hex"]);
const valueText = computed(() => selectedTwName.value ? selectedTwName.value : store.getters["colorPicker/hex"]);

onBeforeMount(() => {
	store.commit("colorPicker/setDefault", {
		type: "hex",
		val: [props.defaultValue ? props.defaultValue : "#ff0000"]
	});
});

const tailwindPaletteList = store.state.tailwindPalette;
const chooseTailwindColor = twColor => {
	store.commit("colorPicker/setHex", twColor.color);
	selectedTwName.value = twColor.name;
};

const chooseCustomColor = hexColor => {
	store.commit("colorPicker/setHex", hexColor);
	selectedTwName.value = null;
};

const submit = () => {
	const val = store.getters["colorPicker/hex"];
	if(val.length <= 0)
		return;

	store.commit("colorPicker/setDefault", {
		type: "hex",
		val: ["#ff0000"]
	});
	emit("submit", val);
};

onMounted(() => {
	if(getActiveTabs == "customColor" && value.length < 1)
		store.commit("colorPicker/setHex", "#ff0000");
});
</script>
<template>
	<FixedModal @close="$emit('cancel')">
		<div ref="customTabIndexRef" @keydown.esc="$emit('cancel')">
			<div class="grid grid-cols-2 px-8 mb-6 lg:mb-12 lg:mx-auto lg:w-[36rem]">
				<button @click="setActiveTabs('twPalette')" type="button" class="px-4 py-2 border border-indigo-600 rounded-l-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus-shadow-default" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'twPalette', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'customColor' }" data-tabindex="2">Tailwind Palette</button>
				<button @click="setActiveTabs('customColor')" type="button" class="px-4 py-2 border border-indigo-600 rounded-r-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus-shadow-default" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'customColor', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'twPalette' }" data-tabindex="3">Custom Color</button>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
				<div class="lg:border-r lg:border-r-gray-200">
					<DataList v-if="getActiveTabs() == 'twPalette'" :model="tailwindPaletteList" @change="chooseTailwindColor" />
					<InputTypeColor v-else class="mb-4 px-8" :defaultValue="value" @change="chooseCustomColor" />
				</div>
				<div class="flex flex-col justify-stretch lg:pl-8">
					<div v-if="value.length > 0 && getActiveTabs() == 'twPalette'" class="flex mb-8 pl-16 pr-16 lg:pl-0 lg:flex-col lg:items-end">
						<span class="font-semibold text-gray-600 mt-8 lg:mt-4">Color Value : </span>
						<ColorViewCircle :color="value" :label="valueText" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-500', 'font-semibold', 'text-sm']" />
					</div>
					<div class="flex justify-end pl-8 pr-8 mt-auto lg:pr-16">
						<button @click="submit" :disabled="value.length < 1" type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus-ring-default focus:ring-indigo-600" data-tabindex="1">Submit</button>
					</div>
				</div>
			</div>
		</div>
	</FixedModal>
</template>

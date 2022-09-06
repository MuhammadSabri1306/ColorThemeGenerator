<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import tailwindPaletteList from "@/data/tailwindPalette.js";
import customTabIndex from "@/modules/customTabIndex";

import FixedModal from "./ui/FixedModal.vue";
import DataList from "./custom-forms/DataList.vue";
import InputTypeColor from "./custom-forms/InputTypeColor/index.vue";

const emit = defineEmits(["submit", "cancel"]);
const props = defineProps({ defaultValue: String });
const store = useStore();

const selectedTwName = ref("");

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

onBeforeMount(() => {
	const defaultHexColor = props.defaultValue ? props.defaultValue : "#ff0000";
	store.commit("colorPicker/setHex", defaultHexColor);
});

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

	store.commit("colorPicker/setHex", "#ff0000");
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
			<div class="grid grid-cols-2 px-8 mb-6 lg:mb-12">
				<button @click="setActiveTabs('twPalette')" type="button" class="px-4 py-2 border border-indigo-600 rounded-l-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus-shadow-default" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'twPalette', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'customColor' }" data-tabindex="2">Tailwind Palette</button>
				<button @click="setActiveTabs('customColor')" type="button" class="px-4 py-2 border border-indigo-600 rounded-r-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus-shadow-default" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'customColor', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'twPalette' }" data-tabindex="3">Custom Color</button>
			</div>
			<div>
				<DataList v-if="getActiveTabs() == 'twPalette'" :model="tailwindPaletteList" @change="chooseTailwindColor" class="mb-8" />
				<InputTypeColor v-else class="mb-4 px-8" :defaultValue="value" @change="chooseCustomColor" />
				<div class="flex justify-end px-8">
					<button @click="submit" :disabled="value.length < 1" type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus-ring-default focus:ring-indigo-600" data-tabindex="1">Submit</button>
				</div>
			</div>
		</div>
	</FixedModal>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import FixedModal from "./ui/FixedModal.vue";
import ColorViewCircle from "./ui/ColorViewCircle.vue";
import InputTypeColor from "./custom-forms/InputTypeColor/index.vue";

const emit = defineEmits(["submit", "cancel"]);
const props = defineProps({ defaultValue: String });
const store = useStore();

const twSearchName = ref("");
const selectedTwName = ref(null);

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

const twSearchList = computed(() => {
	if(twSearchName.value.length <= 0)
		return [];
	return store.getters.searchTailwindName(twSearchName.value);
});

const value = computed(() => store.getters["colorPicker/hex"]);
const valueText = computed(() => selectedTwName.value ? selectedTwName.value : store.getters["colorPicker/hex"]);

onBeforeMount(() => {
	store.commit("colorPicker/setDefault", {
		type: "hex",
		val: [props.defaultValue ? props.defaultValue : "#ff0000"]
	});
});

const chooseTailwindColor = twColor => {
	store.commit("colorPicker/setHex", twColor.color);
	selectedTwName.value = twColor.name;

	twSearchName.value = "";
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

const twSearchInput = ref(null);
onMounted(() => {
	if(getActiveTabs == "customColor" && value.length < 1)
		store.commit("colorPicker/setHex", "#ff0000");
	else if(getActiveTabs() == "twPalette")
		twSearchInput.value.focus();
});

</script>
<template>
	<FixedModal @close="$emit('cancel')">
		<div class="grid grid-cols-2 mb-6 px-8">
			<button @click="setActiveTabs('twPalette')" type="button" class="px-4 py-2 border border-indigo-600 rounded-l-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus:outline-none" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'twPalette', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'customColor' }">Tailwind Palette</button>
			<button @click="setActiveTabs('customColor')" type="button" class="px-4 py-2 border border-indigo-600 rounded-r-md shadow-sm text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus:outline-none" :class="{ 'bg-indigo-600 text-white': getActiveTabs() == 'customColor', 'bg-gray-100 text-indigo-600': getActiveTabs() == 'twPalette' }">Custom Color</button>
		</div>
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="lg:border-r lg:border-r-gray-200">
				<div v-if="getActiveTabs() == 'twPalette'">
					<div class="grid grid-cols-1 mb-4 px-8">
						<input type="text" v-model="twSearchName" ref="twSearchInput" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none" placeholder="Search Tailwind's color">
					</div>
					<div class="flex flex-col items-stretch" :class="{ hidden: twSearchName.length < 1 }">
						<button v-for="(twColor, index) in twSearchList" @click="chooseTailwindColor(twColor)" type="button" class="flex justify-between items-center border-x lg:border-r-0 border-gray-200 bg-white px-8 py-1 hover:bg-gray-100" :class="{ 'border-t': index > 0 }">
							<span class="text-gray-500 text-sm font-semibold">{{ twColor.name }}</span>
							<ColorViewCircle :color="twColor.color" :circleClassList="['w-8', 'h-8']" />
						</button>
					</div>
				</div>
				<InputTypeColor v-else class="mb-4 px-8" :defaultValue="value" @change="chooseCustomColor" />
			</div>
			<div class="flex flex-col justify-stretch">
				<div v-if="value.length > 0 && getActiveTabs() == 'twPalette'" class="flex mb-8 pl-16 pr-16 lg:pl-0 lg:flex-col lg:items-end">
					<span class="font-semibold text-gray-600 mt-8 lg:mt-4">Color Value : </span>
					<ColorViewCircle :color="value" :label="valueText" :circleClassList="['w-16', 'h-16']" :labelClassList="['text-gray-500', 'font-semibold', 'text-sm']" />
				</div>
				<div class="flex justify-end pl-8 pr-8 mt-auto lg:pr-16">
					<button @click="submit" :disabled="value.length < 1" type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Submit</button>
				</div>
			</div>
		</div>
	</FixedModal>
</template>

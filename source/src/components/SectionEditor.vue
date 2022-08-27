<script setup>
import { reactive, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import newColorName from "./modules/newColorName";
import { getBuildTheme } from "./modules/applyThemeSuggestions";

import PanelColor from "./PanelColor.vue";
import FixedModal from "./ui/FixedModal.vue";
import { PlusIcon } from "@heroicons/vue/solid";

const store = useStore();
const route = useRoute();

const newColorModal = reactive({ value: "", show: false, valid: true });
const colors = computed(() => store.state.colors);
const registeredColorsName = computed(() => store.getters["registeredColorsName"]);

const bwColor = computed(() => {
	const black = store.state.colors.black,
		white = store.state.colors.white;
	return { node: { black, white } };
});

const themeColors = computed(() => {
	return store.state.colors.theme.map(({ name, node, values }) => {
		const title = name[0].toUpperCase() + name.slice(1);
		const color = { node, values };
		return { name, title, color };
	});
});

const setThemeColorNode = ({ name, key, val }) => store.commit("updateThemeColor", { name, key, val });
const delThemeColorNode = ({ name, key }) => store.commit("updateThemeColor", { name, key });
const delThemeColor = name => store.commit("updateThemeColor", { name });
const updateThemeColorName = (oldName, newName) => store.commit("updateThemeColorName", { oldName, newName });

const setBaseColor = ({ name, key, val }) => {
	name = name === "bw" ? key : name;
	store.commit("updateBaseColor", { name, val })
};

const newThemeColor = async () => {
	newColorModal.valid = newColorModal.value.length > 0;
	newColorModal.valid = newColorModal.valid && newColorModal.value.search(/[^a-z1-9]/g) < 0;
	if(!newColorModal.valid)
		return;

	const name = newColorModal.value;
	newColorModal.valid = registeredColorsName.value.indexOf(name) < 0;
	if(!newColorModal.valid)
		return;

	newColorModal.show = false;
	store.commit("updateThemeColor", { name });
	newColorModal.value = "";

	await nextTick();
	const themeColorPanelElm = document.querySelectorAll(".others-color-panel");
	themeColorPanelElm[themeColorPanelElm.length - 1].scrollIntoView();
};

const openNewColorModal = () => {
	newColorModal.value = newColorName(registeredColorsName.value);
	newColorModal.show = true;
};

const applyPaletteSuggestions = themeId => {
	const suggestionsTheme = store.state.paletteSuggestion.find(item => item.id == themeId);
	if(!suggestionsTheme)
		return;

	const theme = getBuildTheme(suggestionsTheme);
	["black", "white", "dark", "light"].forEach(name => theme[name] && store.commit("updateBaseColor", { name, val: theme[name] }));

	for(let name in theme.theme){
		if(store.state.colors.theme.findIndex(item => item.name == name) < 0)
			store.commit("updateThemeColor", { name });

		for(let key in theme.theme[name]){
			const val = theme.theme[name][key];
			store.commit("updateThemeColor", { name, key, val });
		}
	}
};

if(route.params.themeId)
	applyPaletteSuggestions(route.params.themeId);
</script>
<template>
	<section>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 px-0 md:px-8 py-8">
			<PanelColor v-for="item in themeColors" :title="item.title" :name="item.name" :color="item.color" :customizable="true" :destroyable="true" :editTitle="true" @setColor="setThemeColorNode" @removeColor="delThemeColorNode" @destroy="delThemeColor" @updateTitle="updateThemeColorName" class="others-color-panel" />
			<PanelColor title="Dark" name="dark" :color="colors.dark" @setColor="setBaseColor" />
			<PanelColor title="Light" name="light" :color="colors.light" @setColor="setBaseColor" />
			<div>
				<PanelColor title="Basic Color" name="bw" :color="bwColor" @setColor="setBaseColor" />
			</div>
		</div>
		<div class="fixed bottom-8 md:bottom-12 lg:bottom-16 right-8 md:right-16 lg:right-32 z-[7777]">
			<button type="button" class="border border-transparent rounded-full shadow-custom-1 text-white p-3 lg:p-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="openNewColorModal">
				<PlusIcon class="w-8 h-8 lg:w-10 lg:h-10" />
			</button>
		</div>
		<FixedModal v-if="newColorModal.show" @close="newColorModal.show = false">
			<div class="flex items-center px-8">
				<label for="newColorName" class="text-gray-700 mr-4">Color's Name</label>
				<div class="flex-grow-1 grid grid-cols-1">
					<input type="text" name="newColorName" v-model="newColorModal.value" class="border rounded-md border-gray-300 px-4 py-1 text-gray-900 focus:border-gray-400 focus:outline-none" placeholder="Enter the color's name">
				</div>
			</div>
			<p v-if="!newColorModal.valid" class="text-sm text-right text-red-500 font-bold px-8 mt-2">Use alphanumeric and uppercase only!</p>
			<div class="flex justify-end px-8 mt-8">
				<button type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" @click="newThemeColor">Create</button>
			</div>
		</FixedModal>
	</section>
</template>

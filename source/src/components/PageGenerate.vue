<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { getBuildTheme } from "./modules/applyThemeSuggestions";

import Navigation from "./Navigation.vue";
import SectionColor from "./SectionColor.vue";
import SectionTailwindResult from "./SectionTailwindResult.vue";
import SectionCssResult from "./SectionCssResult.vue";
import FormConfirm from "./FormConfirm.vue";
import { ColorSwatchIcon } from "@heroicons/vue/solid";

const store = useStore();
const colors = computed(() => store.colors);
const paletteSuggestion = computed(() => store.state.paletteSuggestion);

const applyPaletteSuggestions = () => {
	const themeId = new URL(document.location.href).searchParams.get("themeid");
	if(!themeId)
		return;

	const suggestionsTheme = paletteSuggestion.value.find(item => item.id == themeId);
	if(!suggestionsTheme)
		return;

	const theme = getBuildTheme(suggestionsTheme);
	["black", "white"].forEach(key => theme[key] && store.commit("updateBaseColor", { key, val: theme[key] }));
	["dark", "light"].forEach(name => theme[name] && store.commit("updateBaseColor", { name, val: theme[name] }));

	for(let key in theme.primary){
		store.commit("updatePaletteColor", { name: "primary", key, val: theme.primary[key] });
	}

	for(let name in theme.others){
		store.commit("updatePaletteColor", { name });
		for(let key in theme.others[name]){
			store.commit("updatePaletteColor", { name, key, val: theme.others[name][key] });
		}
	}
};

// watch(() => store.state.paletteSuggestion, paletteSuggestion => applyPaletteSuggestions(paletteSuggestion));
applyPaletteSuggestions();

const activeSection = ref(1);
const formConfirm = ref(null);

const newTheme = () => {
	const message = "Your generated theme will be <span class='font-bold'>deleted!</span> Ready for new theme?";
	formConfirm.value.confirm(message, "Continue")
		.then(() => {
			store.commit("setupColors");
			activeSection.value = 1;
		})
		.catch(() => null);
};

const navigationListener = navIndex => {
	if(navIndex < 0 || navIndex > 3)
		return console.error(`undefined action for navIndex = ${ navIndex } on navigationListener(), PageGenerate.vue`);
	
	if(navIndex == 0)
		return newTheme();
	activeSection.value = navIndex;
};
</script>
<template>
<main>
	<header class="bg-white border-b md:border-b-0 border-gray-300">
		<div class="container flex pt-6 md:pt-10 pb-3 md:pb-10">
			<a href="#home" class="flex justify-center items-end mx-auto">
				<ColorSwatchIcon class="h-10 w-10 text-indigo-500 mr-1" />
				<h2 class="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate">Color Theme Generator</h2>
			</a>
		</div>
	</header>
	<Navigation v-if="activeSection > 0" :activeNavIndex="activeSection" @navigate="navigationListener" />
	<div class="container py-10">
		<SectionColor v-show="activeSection == 1" />
		<SectionTailwindResult v-show="activeSection == 2" />
		<SectionCssResult v-show="activeSection == 3" />
	</div>
</main>
<FormConfirm ref="formConfirm" />
</template>

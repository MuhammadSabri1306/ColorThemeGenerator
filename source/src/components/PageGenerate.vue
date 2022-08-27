<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Navigation from "./Navigation.vue";
import SectionColor from "./SectionColor.vue";
import SectionTailwindResult from "./SectionTailwindResult.vue";
import SectionCssResult from "./SectionCssResult.vue";
import FormConfirm from "./FormConfirm.vue";
import { ColorSwatchIcon } from "@heroicons/vue/solid";

const store = useStore();
const paletteSuggestion = computed(() => store.state.paletteSuggestion);

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

const backToHome = event => {
	const message = "Your generated theme will be <span class='font-bold'>deleted!</span> Continue?";
	const handler = () => {
		store.commit("setupColors");
		document.location.hash = "#home";
	};

	if(!store.state.hasChanged)
		return handler();

	formConfirm.value.confirm(message, "Back to Home").then(handler).catch(() => null);
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
			<button @click="backToHome" class="flex justify-center items-end mx-auto">
				<ColorSwatchIcon class="h-10 w-10 text-indigo-500 mr-1" />
				<h2 class="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate">Color Theme Generator</h2>
			</button>
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

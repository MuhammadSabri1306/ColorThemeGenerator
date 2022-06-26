<script setup>
import { ref } from "vue";
import Navigation from "./Navigation.vue";
import SectionColor from "./SectionColor.vue";
import SectionTailwindResult from "./SectionTailwindResult.vue";
import SectionCssResult from "./SectionCssResult.vue";
import { ColorSwatchIcon } from "@heroicons/vue/solid";

const activeSection = ref(1),
	sectionColor = ref(null),
	sectionTailwindResult = ref(null),
	sectionCssResult = ref(null);


const getColors = () => {
	const initColors = { ...sectionColor.value.colors },
		colors = {};

	const copyColorItem = (target, colorName) => {
		colors[colorName] = {};

		Object.keys(target[colorName].generated).forEach(key => {
			colors[colorName][key] = target[colorName].generated[key];
		});
	};

	const baseColors = ["black", "white"],
		secondColors = ["dark", "light", "primary"],
		otherColors = Object.keys(initColors.others);

	baseColors.forEach(item => colors[item] = initColors.base.custom[item]);
	secondColors.forEach(item => copyColorItem(initColors, item));
	otherColors.forEach(item => copyColorItem(initColors.others, item));

	return colors;
};

const newTheme = () => {
	if(!confirm("Your generated theme will delete! Ready for new theme?"))
		return;

	sectionColor.value.setup();
	sectionTailwindResult.value.init(getColors());
	sectionCssResult.value.init(getColors());

	activeSection.value = 1;
};

const navigationListener = navIndex => {
	if(navIndex == 0)
		return newTheme();

	if([1, 2, 3].indexOf(navIndex) < 0)
		return console.error(`undefined action for navIndex = ${ navIndex } on navigationListener(), PageGenerate.vue`);
	
	const action = {
		1: () => false,
		2: () => sectionTailwindResult.value.init(getColors()),
		3: () => sectionCssResult.value.init(getColors())
	};

	action[navIndex]();
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
		<SectionColor ref="sectionColor" v-show="activeSection == 1" />
		<SectionTailwindResult ref="sectionTailwindResult" v-show="activeSection == 2" />
		<SectionCssResult ref="sectionCssResult" v-show="activeSection == 3" />
	</div>
</main>
</template>

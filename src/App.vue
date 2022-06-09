<script setup>
import { ref, reactive } from "vue";
import BrandHeader from "./components/BrandHeader.vue";
import BaseColorPanel from "./components/BaseColorPanel.vue";
import ColorPanel from "./components/ColorPanel.vue";

import defaultPalette from "./models/defaultPalette";
import generateHalfColors from "./services/generateHalfColors";
import generateColors from "./services/generateColors";

const getDefaultPalette = () => {
	const dPalette = { ...defaultPalette };
	const halfColors = generateHalfColors(dPalette.half.light, dPalette.half.dark);

	return {
		base: dPalette.base,
		dark: halfColors.dark,
		light: halfColors.light,
		primary: generateColors(dPalette.primary),
		others: {}
	};
};

const data = reactive({
	colors: getDefaultPalette(),
	isBaseColorSaved: false,
	hasInit: false
});

const baseColorPanel = ref(null);

const newTheme = () => {
	if(!confirm("Your generated theme will delete! Ready for new theme?"))
		return;

	data.colors = getDefaultPalette();
	data.isBaseColorSaved = false;
	baseColorPanel.value.setupDefaultColors();

	data.hasInit = false;
};

const saveBaseColors = baseColors => {
	data.colors.base = baseColors;
	data.hasInit = true;
};

const changeHalfColors = ({ name, key, val }) => {
	if(["Light", "Dark"].indexOf(title) < 0)
		return;

	let lightColor = data.colors.light.custom[100],
		darkColor = data.colors.dark.custom[900];

	if(name == "Light")
		lightColor = val;
	else if(name == "Dark")
		darkColor = val;

	const halfColors = generateHalfColors(lightColor, darkColor);
	data.colors.light = halfColors.light;
	data.colors.dark = halfColors.dark;
};

const changeColors = ({ name, key, val }) => {
	let colors = data.colors[name].custom;

	colors[key] = val;
	data.colors[name] = generateColors(colors);
};

const removeColors = ({ name, key }) => {
	let colors = data.colors[name].custom;

	delete colors[key];
	data.colors[name] = generateColors(colors);
};
</script>

<template>
	<div class="bg-gray-100 min-h-screen">
		<BrandHeader @newTheme="newTheme" />
		<main class="container">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
				<BaseColorPanel ref="baseColorPanel" title="Base Color" :defaultColors="data.colors.base" :hasInit="data.hasInit" @submit="saveBaseColors" />
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
				<ColorPanel title="Light" name="light" :colors="data.colors.light" @setColor="changeHalfColors" />
				<ColorPanel title="Dark" name="dark" :colors="data.colors.dark" @setColor="changeHalfColors" />
				<ColorPanel title="Primary" name="primary" :colors="data.colors.primary" @setColor="changeColors" :customizable="true" @removeColor="removeColors" />
			</div>
		</main>
	</div>
</template>

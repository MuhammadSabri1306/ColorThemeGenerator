<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import W3Color from "./modules/W3Color";
import { getBuildTheme } from "./modules/applyThemeSuggestions";

const store = useStore();

const convertToHex = color => {
	const [r, g, b] = color;
	const w3Color = new W3Color("rgb", [r, g, b]);
	return w3Color.toHexString();
};

const isLight = color => {
	const [r, g, b] = color;
	const w3Color = new W3Color("rgb", [r, g, b]);
	const lightScore = [];
	const isRgbItemLight = rgbItem => rgbItem > (255 / 2) ? 1 : -1;

	lightScore.push(isRgbItemLight(r));
	lightScore.push(isRgbItemLight(g));
	lightScore.push(isRgbItemLight(b));

	return lightScore.reduce((sum, item) => sum + item, 0) >= 0;
};

const suggestions = computed(() => {
	const data = store.state.paletteSuggestion;
	return data.map(({ id, color }) => {
		color = color.map(rgb => {
			return {
				hex: convertToHex(rgb),
				isLight: isLight(rgb)
			};
		});
		
		return { id, color };
	});
});

const createUrl = themeId => "?themeid=" + themeId + "#generate";

const applyPaletteSuggestions = themeId => {
	const suggestionsTheme = store.state.paletteSuggestion.find(item => item.id == themeId);
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
</script>
<template>
	<div>
		<div v-if="suggestions.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-16">
			<a v-for="item in suggestions" href="#generate" @click="applyPaletteSuggestions(item.id)" class="inline-flex flex-col items-stretch group bg-white hover:bg-indigo-700 border border-gray-300 hover:border-indigo-700 shadow hover:shadow-lg rounded-xl overflow-hidden transition-all duration-200 ease-in-out">
				<div class="overflow-hidden w-full h-28 flex cursor-pointer">
					<div v-for="color in item.color" class="basis-[1px] grow hover:basis-20 overflow-hidden flex transition-all duration-200 ease-in-out" :style="{ background: color.hex }">
						<span :class="{ 'text-white': !color.isLight, 'text-gray-900': color.isLight }" class="block w-full text-center my-auto text-xs font-bold uppercase">{{ color.hex }}</span>
					</div>
				</div>
				<span class="px-8 py-4 text-center text-sm font-semibold text-gray-500 group-hover:text-white focus:outline-none">Apply Palette Theme</span>
			</a>
		</div>
	</div>
</template>
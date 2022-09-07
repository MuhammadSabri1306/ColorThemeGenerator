<script setup>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import W3Color from "@/modules/W3Color";
import { getBuildTheme } from "@/modules/applyThemeSuggestions";

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

const showPaletteHex = reactive({ id: -1, index: -1 });

const setShowPaletteHex = (id, index) => {
	showPaletteHex.id = id;
	showPaletteHex.index = index;
};

const resetShowPaletteHex = (id, index) => {
	showPaletteHex.id = -1;
	showPaletteHex.index = -1;
};

const suggestions = computed(() => {
	const data = store.state.paletteSuggestions.palette;
	return data.map(({ id, color }) => {
		color = color.map((rgb, index) => {
			return {
				hex: convertToHex(rgb),
				isLight: isLight(rgb),
				showText: id === showPaletteHex.id && index === showPaletteHex.index
			};
		});
		
		return { id, color };
	});
});
</script>
<template>
	<div>
		<div class="flex justify-center mb-16">
			<div>
				<h4 class="text-4xl text-center font-black text-gray-800 mt-6 hidden md:block">Scheme Suggestions</h4>
				<h4 class="text-4xl text-center font-black text-gray-800 mt-6 md:hidden">Use Scheme</h4>
				<p class="text-center md:text-left md:ml-12 text-gray-700 md:leading-8">By <a href="http://colormind.io" class="font-bold italic text-lg">colormind.io</a></p>
			</div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8">
			<router-link v-for="item in suggestions" :to="'/generate/editor/' + item.id" class="inline-flex flex-col items-stretch group bg-white hover:bg-indigo-700 border border-gray-300 hover:border-indigo-700 shadow hover:shadow-lg rounded-xl overflow-hidden transition-all duration-200 ease-in-out">
				<div class="overflow-hidden w-full h-28 flex cursor-pointer">
					<div v-for="(color, index) in item.color" :style="{ background: color.hex }" @mouseenter="setShowPaletteHex(item.id, index)" @mouseleave="resetShowPaletteHex(item.id, index)" class="basis-[1px] grow hover:basis-20 overflow-hidden flex transition-all duration-200 ease-in-out">
						<span :class="{ 'text-white': !color.isLight, 'text-gray-900': color.isLight, 'scale-x-0': !color.showText, 'scale-x-100':color.showText }" class="block w-full text-center my-auto text-xs font-bold uppercase transition-all duration-200 ease-in-out">{{ color.hex }}</span>
					</div>
				</div>
				<span class="px-8 py-4 text-center text-sm font-semibold text-gray-500 group-hover:text-white focus:outline-none">Apply Palette Theme</span>
			</router-link>
		</div>
	</div>
</template>
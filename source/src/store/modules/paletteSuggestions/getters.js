import { defineRangeKey, analyzeRange, createColorNode } from "@/modules/generateColorNode";
import newColorName from "@/modules/newColorName";

const getPalette = selectedPalette => {
	if(selectedPalette && !selectedPalette.color)
		return;

	const palette = { theme: {} };
	selectedPalette.color.forEach(([r, g, b]) => {
		const rangeKey = defineRangeKey([r, g, b], ({ w3Color, maxOfRanges }) => {
			const { l } = w3Color.toHsl();
			const reverseKey = Math.round((l / 100) * maxOfRanges);
			return maxOfRanges - reverseKey;
		});
		if(!rangeKey)
			return;

		const paletteKey = analyzeRange(rangeKey);
		if(paletteKey != "dynamic"){
			palette[paletteKey] = createColorNode([r, g, b]);
			return;
		}

		const newName = newColorName(Object.keys(palette.theme));
		palette.theme[newName] = createColorNode([r, g, b], rangeKey);
	});

	return palette;
};

export default {
	getApplied: (state) => (id) => {
		const palette = state.palette.find(item => item.id == id);
		if(!palette)
			return;
		return getPalette(palette);
	}
};
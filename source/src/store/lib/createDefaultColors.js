import generateHalfColors from "./generateHalfColors";
import generateColors from "./generateColors";

const createDefaultColors = defaultPalette => {
	const dPalette = JSON.parse(JSON.stringify(defaultPalette));
	const halfColors = generateHalfColors(dPalette.half.light, dPalette.half.dark);

	const base = { node: dPalette.base },
		dark = halfColors.dark,
		light = halfColors.light,
		primary = generateColors(dPalette.primary),
		others = {};
	return { base, dark, light, primary, others };
};

export default createDefaultColors;
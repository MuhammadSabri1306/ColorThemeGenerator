import defaultPalette from "./../models/defaultPalette";
import generateHalfColors from "./generateHalfColors";
import generateColors from "./generateColors";

const getDefaultPalette = () => {
	const dPalette = { ...defaultPalette };
	const halfColors = generateHalfColors(dPalette.half.light, dPalette.half.dark);

	return {
		base: dPalette.base,
		dark: halfColors.dark,
		light: halfColors.light,
		primary: generateColors(dPalette.primary)
	};
};

export default getDefaultPalette;

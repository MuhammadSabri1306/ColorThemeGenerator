import generateHalfColors from "./generateHalfColors";
import generateColors from "./generateColors";

const createDefaultColors = defaultPalette => {
	const dPalette = JSON.parse(JSON.stringify(defaultPalette));
	const { black, white } = dPalette;
	const { light, dark } = generateHalfColors(dPalette.light, dPalette.dark);
	const theme = Object.entries(dPalette.theme).map(([name, nodes]) => {
		const { node, values } = generateColors(nodes);
		return { name, node, values };
	});

	return { black, white, dark, light, theme };
};

export default createDefaultColors;
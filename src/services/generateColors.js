import ColorRange from "./services/ColorRange";

const generateColors = hexKeys => {
	const generated = {};

	const colors = new ColorRange({
		range: 100,
		colors: hexKeys
	}).convertToHex();

	return {
		custom: hexKeys,
		generated: colors
	};
};

export default generateColors; 

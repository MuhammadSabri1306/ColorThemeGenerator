import ColorRange from "./ColorRange";

const generateColors = (hexKeys = null) => {
	if(hexKeys == null)
		return { custom: {}, generated: {} };
	
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

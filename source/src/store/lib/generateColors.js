import ColorRange from "./ColorRange";

const generateColors = (hexKeys = null) => {
	if(hexKeys == null)
		return { node: {}, values: {} };
	
	const colors = new ColorRange({
		range: 100,
		colors: hexKeys
	}).convertToHex();

	return {
		node: hexKeys,
		values: colors
	};
};

export default generateColors;
import ColorRange from "./ColorRange";

const generateHalfColors = (lightHex, darkHex) => {
	const generated = { light: {}, dark: {} };

	const halfColors = new ColorRange({
		range: 100,
		colors: {
			100: lightHex,
			1800: darkHex
		}
	}).convertToHex();

	[...Array(18).keys()].forEach(item => {
		if(item < 9){
			const key = Number((item + 1) * 100).toString();
			generated.light[key] = halfColors[key];
		}
		else{
			const key = Number((item - 8) * 100).toString(),
				halfKey = Number((item + 1) * 100).toString();
			generated.dark[key] = halfColors[halfKey];
		}
	});

	return {
		light: {
			custom: { 100: lightHex },
			generated: generated.light
		},
		dark: {
			custom: { 900: darkHex },
			generated: generated.dark
		}
	};
};

export default generateHalfColors; 

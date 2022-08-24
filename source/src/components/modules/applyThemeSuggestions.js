import W3Color from "./W3Color";
import newColorName from "./newColorName";

/* ------------- START CONFIG ------------- */
const step = {
	saturation: 2.3,
	lightness: 6.6
};

const ranges = {
	white: 1,
	light: 1,
	dynamic: 9,
	dark: 1,
	black: 2
};
/* ------------- END CONFIG ------------- */

const config = {
	step,
	ranges: {
		...ranges,
		getMin(){
			return 0;
		},
		getMax(){
			return Object.values(this).reduce((sum, item) => (typeof item == "number") ? sum + item : sum, 0) - 1;
		},
		getRanges(){
			let { white, light, dynamic, dark, black } = this;
			const createRanges = (startVal, length) => {
				if(length < 1) return [];
				const ranges = [startVal];
				for(let i = 1; i < length; i++){
					ranges.push(startVal + i);
				}
				return ranges;
			};

			white = createRanges(0, white);
			light = createRanges(Math.max(...white) + 1, light);
			dynamic = createRanges(Math.max(...light) + 1, dynamic);
			dark = createRanges(Math.max(...dynamic) + 1, dark);
			black = createRanges(Math.max(...dark) + 1, black);

			return { white, light, dynamic, dark, black };
		}
	}
};

const analyzeRange = themeRangesKey => {
	const themeRanges = config.ranges.getRanges();

	if(themeRanges.dynamic.indexOf(themeRangesKey) >= 0)
		return "dynamic";

	delete themeRanges.dynamic;
	for(let q in themeRanges){
		if(themeRanges[q].indexOf(themeRangesKey) >= 0)
			return q;
	}
};

const analyzeDynamicKey = themeRangesKey => {
	const themeDynamicRangeConfig = config.ranges.getRanges().dynamic;
	const minDynamicRangeConfig = Math.min(...themeDynamicRangeConfig);
	return (themeRangesKey - minDynamicRangeConfig + 1) * 100;
};

const createColorNode = (themeRangesKey, hexColor) => {
	const { h, s, l} = new W3Color("hex", [hexColor]).toHsl();
	const getDiffColor = (baseKey, targetKey, step) => {
		const diff = baseKey - targetKey;
		return diff / 100 * Math.round(step);
	};

	const baseKey = analyzeDynamicKey(themeRangesKey);
	const colorNode = {};
	colorNode[baseKey] = hexColor;

	if(baseKey > 100){
		const diffS1 = getDiffColor(baseKey, 100, config.step.saturation);
		const diffL1 = getDiffColor(baseKey, 100, config.step.lightness);
		colorNode[100] = new W3Color("hsl", [h, s + diffS1, l + diffL1]).toHexString();
	}

	if(baseKey < 900){
		const diffS9 = getDiffColor(baseKey, 900, config.step.saturation);
		const diffL9 = getDiffColor(baseKey, 900, config.step.lightness);
		colorNode[900] = new W3Color("hsl", [h, s + diffS9, l + diffL9]).toHexString();
	}

	return colorNode;
};

const getBuildTheme = selectedTheme => {
	if(selectedTheme && !selectedTheme.color)
		return;

	const theme = { others: {} };
	selectedTheme.color.forEach(([r, g, b]) => {
		const w3Color = new W3Color("rgb", [r, g, b]);
		const { l } = w3Color.toHsl();
		const lightness = Math.round((l / 100) * config.ranges.getMax());

		const themeRangesKey = config.ranges.getMax() - lightness;
		const themeKey = analyzeRange(themeRangesKey);

		if(themeKey != "dynamic"){
			theme[themeKey] = w3Color.toHexString();
			return;
		}

		if(!theme.primary){
			theme.primary = createColorNode(themeRangesKey, w3Color.toHexString());
			return;
		}

		const newName = newColorName([...Object.keys(theme.others), "primary"]);
		theme.others[newName] = createColorNode(themeRangesKey, w3Color.toHexString());
	});

	return theme;
};

export { config, analyzeRange, analyzeDynamicKey, createColorNode, getBuildTheme };
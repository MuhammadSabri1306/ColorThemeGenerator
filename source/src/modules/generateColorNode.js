import W3Color from "./W3Color";

const config = {
	nodeInterval: { saturation: 2.3, lightness: 6.6 },
	numOfRanges: { white: 1, light: 1, dynamic: 9, dark: 1, black: 2 }
};

const defineRangeKey = ([r, g, b], callable) => {
	if(typeof callable != "function")
		return;

	const w3Color = new W3Color("rgb", [r, g, b]);
	const maxOfRanges = Object.values(config.numOfRanges).reduce((sum, val) => (typeof val == "number") ? sum + val : sum, 0) - 1;
	const minOfRanges = 0;
	const { nodeInterval, numOfRanges } = config;

	return callable({ w3Color, maxOfRanges, minOfRanges, nodeInterval, numOfRanges });
};

const getRanges = () => {
	let { white, light, dynamic, dark, black } = config.numOfRanges;

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
};

const analyzeRange = rangesKey => {
	const ranges = getRanges();

	if(ranges.dynamic.indexOf(rangesKey) >= 0)
		return "dynamic";

	delete ranges.dynamic;
	for(let q in ranges){
		if(ranges[q].indexOf(rangesKey) >= 0)
			return q;
	}
};

const analyzeDynamicKey = rangesKey => {
	const minDynamicRange = Math.min(...getRanges().dynamic);
	return (rangesKey - minDynamicRange + 1) * 100;
};

const getDiffColor = (baseKey, targetKey, intervalName) => {
	const interval = config.nodeInterval[intervalName];
	if(!interval){
		console.error(`unknown intervalName: ${ intervalName } in config.interval`);
		return false;
	}

	const diff = baseKey - targetKey;
	return diff / 100 * Math.round(interval);
};

const createColorNode = (rgbArr, rangesKey = null) => {
	const w3Color = new W3Color("rgb", rgbArr);
	const hexColor = w3Color.toHexString();

	if(!rangesKey)
		return hexColor;

	const baseKey = analyzeDynamicKey(rangesKey);
	const colorNode = {};
	colorNode[baseKey] = hexColor;

	const { h, s, l} = new W3Color("hex", [hexColor]).toHsl();
	let diffSat, diffLight;

	if(baseKey > 100){
		diffSat = getDiffColor(baseKey, 100, "saturation");
		diffLight = getDiffColor(baseKey, 100, "lightness");
		colorNode[100] = new W3Color("hsl", [h, s + diffSat, l + diffLight]).toHexString();
	}

	if(baseKey < 900){
		diffSat = getDiffColor(baseKey, 900, "saturation");
		diffLight = getDiffColor(baseKey, 900, "lightness");
		colorNode[900] = new W3Color("hsl", [h, s + diffSat, l + diffLight]).toHexString();
	}

	return colorNode;
};

export { defineRangeKey, analyzeRange, createColorNode };
import tailwindPalette from "./data/tailwindPalette";
import searchAlgorithm from "./lib/searchAlgorithm";

const objToArr = obj => {
	return Object.entries(obj).map(([key, val]) => {
		return { key, val };
	});
};

export default {
	searchTailwindName(){
		return searchKey => searchAlgorithm(searchKey, tailwindPalette);
	},
	format(state){
		const colors = {
			...state.colors.base.node,
			dark: { ...state.colors.dark.values },
			light: { ...state.colors.light.values },
			primary: { ...state.colors.primary.values },
		};

		Object.keys(state.colors.others).forEach(name => {
			colors[name] = { ...state.colors.others[name].values };
		});

		return colors;
	},
	twResult(state, getters){
		const { black, white, ...rangeColors } = getters.format;
		const ranges = objToArr(rangeColors).map(({ key, val }) => {
			val = objToArr(val);
			return { key, val };
		});

		return { black, white, ranges };
	},
	css(state, getters){
		const { black, white, ...rangeColors } = getters.format;
		let result = objToArr({ black, white });

		Object.entries(rangeColors).forEach(([name, nodes]) => {
			const temp = {};
			Object.entries(nodes).forEach(([key, val]) => temp[`${ name }-${ key }`] = val);
			result = [...result, ...objToArr(temp)];
		});
		
		return result;
	}
};
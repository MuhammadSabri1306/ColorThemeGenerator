const objToArr = obj => {
	return Object.entries(obj).map(([key, val]) => {
		return { key, val };
	});
};

export default {
	colorsResult(state){
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
		const { black, white, ...rangeColors } = getters.colorsResult;
		const ranges = objToArr(rangeColors).map(({ key, val }) => {
			val = objToArr(val);
			return { key, val };
		});

		return { black, white, ranges };
	},
	cssResult(state, getters){
		const { black, white, ...rangeColors } = getters.colorsResult;
		let result = objToArr({ black, white });

		Object.entries(rangeColors).forEach(([name, nodes]) => {
			const temp = {};
			Object.entries(nodes).forEach(([key, val]) => temp[`${ name }-${ key }`] = val);
			result = [...result, ...objToArr(temp)];
		});
		
		return result;
	}
};
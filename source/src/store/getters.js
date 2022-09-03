const objToArr = obj => Object.entries(obj).map(([key, val]) => {
	return { key, val };
});

export default {
	registeredColorsName(state){
		return ["black", "white", "dark", "light", ...state.colors.theme.map(item => item.name)];
	},
	format(state){
		const { black, white, dark, light, theme } = state.colors;
		const colors = {
			black,
			white,
			light,
			dark: { ...dark.values },
			light: { ...light.values }
		};

		theme.forEach(colorTheme => {
			colors[colorTheme.name] = { ...colorTheme.values };
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
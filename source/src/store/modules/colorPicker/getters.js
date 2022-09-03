export default {
	hue(state){
		return state.color.toHsv().h;
	},
	postX(state){
		return state.color.toHsv().s;
	},
	postY(state){
		return 100 - state.color.toHsv().v;
	},
	post(state, getters){
		return { x: getters.postX, y: getters.postY };
	},
	hex(state){
		return state.color.toHexString()
	},
	rgb(state){
		return state.color.toRgb();
	}
};
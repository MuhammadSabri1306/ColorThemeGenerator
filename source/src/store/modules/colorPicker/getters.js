export default {
	hue(state){
		return state.cpColor.toHsv().h;
	},
	postX(state){
		console.log(state.cpColor.toHsv().s);
		return state.cpColor.toHsv().s;
	},
	postY(state){
		return 100 - state.cpColor.toHsv().v;
	},
	post(state, getters){
		return { x: getters.postX, y: getters.postY };
	},
	hex(state){
		return state.cpColor.toHexString()
	},
	rgb(state){
		return state.cpColor.toRgb();
	}
};
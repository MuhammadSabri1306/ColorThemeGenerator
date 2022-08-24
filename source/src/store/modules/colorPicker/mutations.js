import W3Color from "../../../components/modules/W3Color";

export default {
	setDefault(state, { type, val }){
		state.cpColor = new W3Color(type, val);
	},
	setTailwindName(state, name){
		state.tailwindName = name;
	},
	clearTailwindName(state){
		state.tailwindName = "";
	},
	setHue(state, hue){
		const { h, s, v } = state.cpColor.toHsv();
		state.cpColor = new W3Color("hsv", [hue, s, v]);
	},
	setPostX(state, x){
		const { h, s, v } = state.cpColor.toHsv();
		state.cpColor = new W3Color("hsv", [h, x, v]);
	},
	setPostY(state, y){
		const { h, s, v } = state.cpColor.toHsv();
		state.cpColor = new W3Color("hsv", [h, s, 100 - y]);
	},
	setHex(state, hex){
		state.cpColor = new W3Color("hex", [hex]);
	},
	setRGB(state, { r, g, b }){
		const rgb = state.cpColor.toRgb();
		const rgbR = r ? r.replace(/\D/g, "") : rgb.r;
		const rgbG = g ? g.replace(/\D/g, "") : rgb.g;
		const rgbB = b ? b.replace(/\D/g, "") : rgb.b;

		state.cpColor = new W3Color("rgb", [rgbR, rgbG, rgbB]);
	}
};
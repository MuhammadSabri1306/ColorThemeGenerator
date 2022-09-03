import W3Color from "@/modules/W3Color";

export default {
	setHex(state, hex){
		state.color = new W3Color("hex", [hex]);
	}
};
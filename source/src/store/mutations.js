import defaultPalette from "./data/palette";
import createDefaultColors from "./lib/createDefaultColors";
import generateHalfColors from "./lib/generateHalfColors";
import generateColors from "./lib/generateColors";

export default {
	setupColors(state){
		state.colors = createDefaultColors(defaultPalette);
	},
	updateBaseColor(state, { key, val }){
		if(["black", "white"].indexOf(key) < 0)
			return;
		state.colors.base.node[key] = val;
	},
	updateHalfColor(state, { name, key, val }){
		if(["light", "dark"].indexOf(name) < 0)
			return;

		const prevColors = {
			light: state.colors.light.node[100],
			dark: state.colors.dark.node[900]
		};
		prevColors[name] = val;

		const halfColors = generateHalfColors(prevColors.light, prevColors.dark);
		state.colors.light = halfColors.light;
		state.colors.dark = halfColors.dark;
	},
	updatePaletteColor(state, { name, key, val }){
		if(!name) return;
		const route = {
			newOthersColor: name != "primary" && !key && !val,
			setPrimaryNode: name == "primary" && key && val,
			setOthersNode: name != "primary" && key && val,
			delPrimaryNode: name == "primary" && key && !val,
			delOthersNode: name != "primary" && key && !val
		};

		const [action] = Object.entries(route).find(([ action, condition ]) => condition);
		if(!action) return;

		if(action === "newOthersColor"){
			state.colors.others[name] = generateColors();
			return;
		}

		const nodes = name != "primary" ? state.colors.others[name].node : state.colors.primary.node;
		if(action === "setPrimaryNode" || action === "setOthersNode")
			nodes[key] = val;
		else if(action === "delPrimaryNode" || action === "delOthersNode")
			delete nodes[key];

		if(action === "setPrimaryNode" || action === "delPrimaryNode")
			state.colors.primary = generateColors(nodes);
		else if(action === "setOthersNode" || action === "delOthersNode")
			state.colors.others[name] = generateColors(nodes);	
	},
	deleteOthersColor(state, name){
		delete state.colors.others[name];
	},
};
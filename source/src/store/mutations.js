import defaultPalette from "./data/palette";
import createDefaultColors from "./lib/createDefaultColors";
import generateHalfColors from "./lib/generateHalfColors";
import generateColors from "./lib/generateColors";

export default {
	setupColors(state){
		state.colors = createDefaultColors(defaultPalette);
		state.hasChanged = false;
	},
	updateBaseColor(state, { name, val }){
		const baseColorName = ["black", "white", "dark", "light"];
		if(baseColorName.indexOf(name) < 0)
			return;

		// Black and White
		if(baseColorName.slice(0, 2).indexOf(name) >= 0){
			state.colors[name] = val;
			if(!state.hasChanged)
				state.hasChanged = true;
			return;
		}

		// Dark and Light
		const prevColors = {
			light: state.colors.light.node[100],
			dark: state.colors.dark.node[900]
		};

		prevColors[name] = val;
		const { light, dark } = generateHalfColors(prevColors.light, prevColors.dark);
		state.colors.light = light;
		state.colors.dark = dark;

		if(!state.hasChanged)
			state.hasChanged = true;
	},
	updateThemeColor(state, { name, key, val }){
		if(!name)
			return;

		const hasChanged = () => {
			if(!state.hasChanged)
				state.hasChanged = true;
		};

		// generate new color
		const targetColorIndex = state.colors.theme.findIndex(color => color.name === name);
		if(targetColorIndex < 0){
			const { node, values } = generateColors();
			state.colors.theme.push({ name, node, values });
			hasChanged();
			return;
		}

		// delete color
		if(!key && !val){
			state.colors.theme = state.colors.theme.filter(color => color.name != name);
			hasChanged();
			return;
		}

		const nodes = state.colors.theme[targetColorIndex].node;
		if(key && !val) // delete color node
			delete nodes[key];
		else if(key && val) // set color node
			nodes[key] = val;
		const { node, values } = generateColors(nodes);
		state.colors.theme[targetColorIndex].node = node;
		state.colors.theme[targetColorIndex].values = values;
		hasChanged();
	},
	updateThemeColorName(state, { oldName, newName }){
		const targetColorIndex = state.colors.theme.findIndex(color => color.name === oldName);
		if(targetColorIndex >= 0)
			state.colors.theme[targetColorIndex].name = newName;
	},
	pushPaletteSuggestions(state, palette){
		state.paletteSuggestion.push(palette);
	}
};
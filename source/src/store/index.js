import { createStore, createLogger } from "vuex";
import tailwindPalette from "./data/tailwindPalette";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import colorPicker from "./modules/colorPicker";

export default createStore({
	state: {
		colors: {},
		hasChanged: false,
		tailwindPalette,
		paletteSuggestion: [],
		showLoadAnimation: true
	},
	getters,
	mutations,
	actions,
	modules: { colorPicker },
	plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
	strict: process.env.NODE_ENV !== "production"
});
import { createStore, createLogger } from "vuex";
import tailwindPalette from "@/data/tailwindPalette";

import getters from "./getters";
import mutations from "./mutations";

import colorPicker from "./modules/colorPicker";
import paletteSuggestions from "./modules/paletteSuggestions";
import loadAnimation from "./modules/loadAnimation";

const store = createStore({
	state: {
		colors: {},
		hasChanged: false,
		tailwindPalette
	},
	getters,
	mutations,
	modules: { colorPicker, paletteSuggestions, loadAnimation },
	plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
	strict: process.env.NODE_ENV !== "production"
});

export default store;
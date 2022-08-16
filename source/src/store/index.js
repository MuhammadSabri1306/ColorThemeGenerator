import { createStore, createLogger } from "vuex";

import getters from "./getters";
import mutations from "./mutations";

import colorPicker from "./modules/colorPicker";

export default createStore({
	state: {
		colors: {},
		hasChanged: false
	},
	getters,
	mutations,
	modules: { colorPicker },
	plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
	strict: process.env.NODE_ENV !== "production"
});
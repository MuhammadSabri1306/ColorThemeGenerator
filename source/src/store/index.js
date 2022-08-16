import { createStore, createLogger } from "vuex";

import getters from "./getters";
import mutations from "./mutations";

import colorPicker from "./modules/colorPicker";

export default createStore({
	state: { colors: {} },
	getters,
	mutations,
	modules: { colorPicker },
	plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
	strict: process.env.NODE_ENV !== "production"
});

/*
this.$store

or

import { useStore } from "vuex";
const store = useStore();
*/
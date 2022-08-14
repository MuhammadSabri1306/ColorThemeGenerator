import { createStore, createLogger } from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import tailwindPalette from "./data/tailwindPalette";

const state = {
	colors: {},
	twPalette: tailwindPalette
};

export default createStore({
	state,
	getters,
	mutations,
	plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
	strict: process.env.NODE_ENV !== "production"
});

/*
this.$store

or

import { useStore } from "vuex";
const store = useStore();
*/
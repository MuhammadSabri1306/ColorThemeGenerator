import getters from "./getters";
import mutations from "./mutations";

export default {
	namespaced: true,
	state: { color: null, tailwindName: "" },
	getters,
	mutations 
};
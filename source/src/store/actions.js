import fetchRandomPalette from "./lib/fetchRandomPalette";
import offlinePaletteSuggestions from "./data/offlinePaletteSuggestions";

export default {
	fetchPaletteSuggestions({ commit }){
		const isOffline = !navigator.onLine;
		if(true){
			offlinePaletteSuggestions.forEach(item => commit("pushPaletteSuggestions", item));
			return;
		}

		const numOfSuggestions = 10;
		for(let i=0; i<numOfSuggestions; i++){
			fetchRandomPalette(result => {
				const palette = { id: i, color: result };
				commit("pushPaletteSuggestions", palette);
			});
		}
	}
};
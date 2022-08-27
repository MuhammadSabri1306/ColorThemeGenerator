import fetchRandomPalette from "./lib/fetchRandomPalette";
import offlinePaletteSuggestions from "./data/offlinePaletteSuggestions";

export default {
	fetchPaletteSuggestions({ commit }){
		const isOffline = !navigator.onLine;
		if(isOffline){
			offlinePaletteSuggestions.forEach(item => commit("pushPaletteSuggestions", item));
			return;
		}

		const savedPaletteSuggestionsJSON = JSON.parse(window.sessionStorage.getItem("colorthemegenerator-palettesuggestions"));
		if(savedPaletteSuggestionsJSON){
			savedPaletteSuggestionsJSON.forEach(item => commit("pushPaletteSuggestions", item));
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
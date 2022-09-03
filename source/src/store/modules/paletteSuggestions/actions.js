import fetchRandomPalette from "@/modules/fetchRandomPalette";
import offlinePaletteSuggestions from "@/data/offlinePaletteSuggestions";

export default {
	fetch({ commit }){
		const isOffline = !navigator.onLine;
		if(isOffline){
			offlinePaletteSuggestions.forEach(item => commit("push", item));
			return;
		}

		const savedPaletteSuggestionsJSON = JSON.parse(window.sessionStorage.getItem("colorthemegenerator-palettesuggestions"));
		if(savedPaletteSuggestionsJSON){
			savedPaletteSuggestionsJSON.forEach(item => commit("push", item));
			return;
		}

		const numOfSuggestions = 10;
		for(let i=0; i<numOfSuggestions; i++){
			fetchRandomPalette(result => {
				const palette = { id: i, color: result };
				commit("push", palette);
			});
		}
	}
};
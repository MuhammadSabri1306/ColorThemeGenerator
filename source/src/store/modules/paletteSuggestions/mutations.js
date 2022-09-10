import paletteSuggestions from "@/data/paletteSuggestions";
import randomArrayNumber from "@/modules/randomArrayNumber";
import session from "@/modules/session";

export default {
	init(state, palette){
		const savedSuggestionsJSON = session.get("palettesuggestions");
		let colorId = [];

		if(savedSuggestionsJSON){
			const savedSuggestions = JSON.parse(savedSuggestionsJSON);
			if(Array.isArray(savedSuggestions) && savedSuggestions.length > 0)
				colorId = savedSuggestions.map(item => item.id);
		}
		else
			colorId = randomArrayNumber(10, 0, 99);

		colorId.forEach(item => {
			if(paletteSuggestions[item])
				state.palette.push(paletteSuggestions[item]);
		});

		if(state.palette.length == 10){
			const pSuggestions = JSON.stringify(state.palette);
			session.set("palettesuggestions", pSuggestions);
		}

	}
};
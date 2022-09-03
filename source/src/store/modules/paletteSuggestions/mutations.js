export default {
	push(state, palette){
		state.palette.push(palette);

		if(state.palette.length == 10){
			const paletteSuggestions = JSON.stringify(state.palette);
			window.sessionStorage.setItem("colorthemegenerator-palettesuggestions", paletteSuggestions);
		}
	}
};
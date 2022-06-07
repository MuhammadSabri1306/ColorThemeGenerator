import Color from "./Color.js";

class ColorRange {
	constructor(params = null){
		if(params == null){
			this.range = 0;
			this.colors = null;
			return;
		}

		if(params.hasOwnProperty("range"))
			this.range = params.range;

		if(params.hasOwnProperty("colors")){
			this.colors = params.colors.map(c => {
				if(Color.isColor(c))
					return c;
				if(Color.isColorFormatted(c))
					return new Color(c);
				return false
			}).filter(c => c !== false);
		}
	}

	generate(){
		if(this.range < 1 || Object.keys(this.colors).length < 1)
			return false;

		let colors = Object.entries(this.colors).map(([key, val]) => {
			return { key:parseInt(key), val };
		});
		let generated = this.colors;

		for(let i = 0; i < result.length - 1; i++){
			const k = parseInt((colors[i + 1].key - colors[i].key) / this.range);
			let interval = {}, j = 1;

			interval.r = parseInt((colors[i + 1].val.get().rgb().r - colors[i].val.get().rgb().r) / this.range);
			interval.g = parseInt((colors[i + 1].val.get().rgb().g - colors[i].val.get().rgb().g) / this.range);
			interval.b = parseInt((colors[i + 1].val.get().rgb().b - colors[i].val.get().rgb().b) / this.range);

			for(key = colors[i].key + k; key < colors[i + 1].key; key+k){
				const newColor = {
					r: colors[i].val.get().rgb().r + interval.r * j,
					g: colors[i].val.get().rgb().g + interval.g * j,
					b: colors[i].val.get().rgb().b + interval.b * j
				};

				generated[key] = new Color(newColor);
				j++;
			}
		}

		return generated;
	}
}

export default ColorRange;

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
			this.colors = {};
			Object.entries(params.colors).forEach(([key, val]) => {
				if(Color.isColor(val))
					this.colors[key] = val;
				if(Color.isColorFormat(val))
					this.colors[key] = new Color(val);
			});
		}
	}

	generate(){
		if(this.range < 1 || Object.keys(this.colors).length < 1)
			return false;

		let colors = Object.entries(this.colors).map(([key, val]) => {
			return {key, val};
		});
		let generated = this.colors;

		for(let i = 0; i < colors.length - 1; i++){
			const k = parseInt((parseInt(colors[i + 1].key) - parseInt(colors[i].key)) / this.range);
			let interval = {}, j = 1;
			const colorsRGB = {
				current: colors[i].val.get().rgb(),
				next: colors[i + 1].val.get().rgb()
			};

			interval.r = parseInt((colorsRGB.next.r - colorsRGB.current.r) / k);
			interval.g = parseInt((colorsRGB.next.g - colorsRGB.current.g) / k);
			interval.b = parseInt((colorsRGB.next.b - colorsRGB.current.b) / k);

			let addedKeys = parseInt(colors[i].key) + this.range;
			while(addedKeys < parseInt(colors[i + 1].key)){
				const addedColor = {
					r: colors[i].val.get().rgb().r + interval.r * j,
					g: colors[i].val.get().rgb().g + interval.g * j,
					b: colors[i].val.get().rgb().b + interval.b * j
				};

				generated[addedKeys] = new Color(addedColor);
				addedKeys += this.range;
				j++;
			}
		}

		return generated;
	}

	convertToHex(){
		const colors = this.generate();
		const converted = {};

		Object.entries(colors).forEach(([key, color]) => {
			converted[key] = color.get().hex();
		});

		return converted;
	}
}

export default ColorRange;

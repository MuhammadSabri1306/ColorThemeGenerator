class Color {
	static convertToRGB(hex){
		return {
			r: parseInt(hex[1] + hex[2], 16),
			g: parseInt(hex[3] + hex[4], 16),
			b: parseInt(hex[5] + hex[6], 16)
		};
	}

	static convertToHex(r, g, b){
		const unitToHex = unit => {
			const hex = unit.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		};

		return "#" + unitToHex(r) + unitToHex(g) + unitToHex(b);
	}

	static isColor(obj){
		return Boolean(obj.isColor);
	}

	static isColorFormat(c){
		if(typeof c == "string" && c.length == 7 && c[0] == "#")
			return true;
		if(typeof c == "object" && c.hasOwnProperty("r") && c.hasOwnProperty("g") && c.hasOwnProperty("b"))
			return true;
		return false;
	}

	constructor(color = null){
		this.isColor = true;
		if(color != null) this.set(color);
	}

	set(color){
		if(typeof color == "string" && color[0] == "#"){
			color = Color.convertToRGB(color);
		}

		if(typeof color == "object"){
			if(color.hasOwnProperty("r")) this.r = color.r;
			if(color.hasOwnProperty("g")) this.g = color.g;
			if(color.hasOwnProperty("b")) this.b = color.b;
		}
	}

	get(){
		const r = this.r, g = this.g, b = this.b;
		return {
			rgb: () => {
				return { r, g, b };
			},
			hex: () => Color.convertToHex(r, g, b)
		};
	}
}

export default Color;

const hexToRgb = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
};

const rgbToHex = (r, g, b) => {
	const hexOf = item => {
		const hex = item.toString(16);
		return (hex.length == 1) ? "0" + hex : hex;
	};

	return "#" + hexOf(r) + hexOf(g) + hexOf(b);
};

const rgbToHsl = (r, g, b) => {
	r /= 255, b /= 255, b /= 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	
	if(max == min)
		h = s = 0;
	else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}	
		h /= 6;
	}

	h = Math.round((h * 100 + 0.5) | 0)
	s = Math.round((s * 100 + 0.5) | 0);
	l = Math.round((l * 100 + 0.5) | 0);

	return { h, s, l };
};

const hslToRgb = (h, s, l) => {
	/*h /= 360;*/ s /= 100; l /= 100;
	const t2 = (l < 0.5) ? l * (s + 1) : l + s - (l * s);
	const t1 = l * 2 - t2;

	const hueToRgb = (t1, t2, hue) => {
		console.log("\n\n" + t1, t2, hue, "\n\n");
		if(hue < 0) hue += 6;
		if(hue >= 6) hue -= 6;
		
		if(hue < 1) return (t2 - t1) * hue + t1;
		else if(hue < 3) return t2;
		else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
		else return t1;
	};

	return {
		r: Math.round(hueToRgb(t1, t2, h + 2) * 255),
		g: Math.round(hueToRgb(t1, t2, h) * 255),
		b: Math.round(hueToRgb(t1, t2, h - 2) * 255)
	};
};

const tests = () => {
	let hex = "#32a852";
	console.log("HEX = " + hex);

	let rgb = hexToRgb(hex);
	if(!rgb){
		console.log(rgb);
		return;
	}
	console.log(`HEX >> RGB = ${ rgb.r }, ${ rgb.g }, ${ rgb.b }`);

	let hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	if(!hsl){
		console.log(hsl);
		return;
	}
	console.log(`RGB >> HSL = ${ hsl.h }deg, ${ hsl.s }%, ${ hsl.l }%`);

	rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
	if(!rgb){
		console.log(rgb);
		return;
	}
	console.log(`RGB << HSL = ${ rgb.r }, ${ rgb.g }, ${ rgb.b }`);

	hex = rgbToHex(rgb.r, rgb.g, rgb.b);
	console.log("HEX << RGB = " + hex);
};

const tests1 = () => {
	let hsl = { h:136, s:54, l:43 };
	console.log(`HSL = ${ hsl.h }deg, ${ hsl.s }%, ${ hsl.l }%`);

	let rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
	if(!rgb){
		console.log(rgb);
		return;
	}
	console.log(`HSL >> RGB = ${ rgb.r }, ${ rgb.g }, ${ rgb.b }`);

	let hex = rgbToHex(rgb.r, rgb.g, rgb.b);
	console.log("RGB >> HEX = " + hex);
};

const w3color = require("./w3color");

const tests2 = () => {
	let color = w3color.createColor("hsl(136, 54%, 43%)");
	console.log(`HSL = ${ color.hue }deg, ${ Math.round(color.sat * 100) }%, ${ Math.round(color.lightness * 100) }%`);
	console.log(`HSL >> RGB = ${ color.red }, ${ color.green }, ${ color.blue }`);
	console.log("RGB >> HEX = " + color.toHexString());

	color = w3color.createColor("#32a952");
	console.log(`HEX >> HSL = ${ color.hue }deg, ${ Math.round(color.sat * 100) }%, ${ Math.round(color.lightness * 100) }%`);
};

tests2();

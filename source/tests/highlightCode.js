const str = `dark{// tailwind.config.js}dark\n\npurple{module}purple.exports = {\n  content: ['./src/**/*.{html,js}'],\n  theme: {\n    colors: {\n      transparent: 'transparent',\n      current: 'currentColor',\n      'white': '#ffffff',\n      'primary': {\n        100: '#fdfdfd',\n        900: '#cdcdcd'\n      }\n    },\n    extend: {}\n  },\n  plugins: [],\n}`;

const highlightColors = {
	red: "text-red-600",
	blue: "text-sky-600",
	yellow: "text-yellow-400",
	green: "text-green-500",
	purple: "text-violet-500",
	dark: "text-gray-200"
};

const replaceMark = (content, color, elmClass) => {
	const regxFind = new RegExp(`${color}\{.+\}${color}`, "g"),
		regxText = new RegExp(`(${color}\{|\}${color})`, "g");

	const contentMatch = content.match(regxFind);
	if(!Boolean(contentMatch))
		return content;

	const searchArr = contentMatch.map(targetText => {
		const replaceText = targetText.replace(regxText, "");
		return { targetText, replaceText };
	});

	searchArr.forEach(({ targetText, replaceText }) => {
		content = content.replaceAll(targetText, `<span class="${elmClass}">${replaceText}</span>`);
	});

	return content;
};

const highlightCode = () => {
	let content = str;

	Object.entries(highlightColors).forEach(([color, elmClass]) => content = replaceMark(content, color, elmClass));
	console.log(content);
};

module.exports = { highlightCode };

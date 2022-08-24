const newColorName = availabledNames => {
	const defaultName = "secondary",
		numberedName = "untitled";

	if(availabledNames.length < 1 || availabledNames.indexOf(defaultName) < 0)
		return defaultName;

	const regx = new RegExp(`^(${ numberedName })`, "g");
	availabledNames = availabledNames.filter(item => item.search(regx) >= 0);
	if(availabledNames.length < 1)
		return numberedName + "1";

	const numbers = availabledNames.map(item => Number(item.slice(numberedName.length)));
	return numberedName + (Math.max(...numbers) + 1).toString();
};

export default newColorName;

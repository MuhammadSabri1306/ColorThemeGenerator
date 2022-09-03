const newColorName = availabledNames => {
	const defaultName = ["primary", "secondary", "tertiary"],
		numberedName = "untitled";

	if(availabledNames.length < 1)
		return defaultName[0];

	let defaultNameIndex = -1;
	for(let i = 0; i < defaultName.length; i++){
		if(availabledNames.indexOf(defaultName[i]) < 0){
			defaultNameIndex = i;
			i = defaultName.length;
		}
	}

	if(defaultNameIndex >= 0)
		return defaultName[defaultNameIndex];

	const regx = new RegExp(`^(${ numberedName })`, "g");
	availabledNames = availabledNames.filter(item => item.search(regx) >= 0);
	if(availabledNames.length < 1)
		return numberedName + "1";

	const numbers = availabledNames.map(item => Number(item.slice(numberedName.length)));
	return numberedName + (Math.max(...numbers) + 1).toString();
};

export default newColorName;

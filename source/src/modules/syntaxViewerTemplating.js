const buildTemplate = template => {
	let [header, footer] = template.split("<--DIVIDER-->");

	const toLine = template => template.split("\n")
		.filter(item => item.length > 0)
		.map(item => {
			const tabArr = item.match(/\t/g);

			const tabIndent = tabArr ? tabArr.length : 0,
				content = item.replace(/\t/g, "");
			return { tabIndent, content };
		});

	header = toLine(header);
	footer = toLine(footer);
	return { header, footer };
};

export { buildTemplate };
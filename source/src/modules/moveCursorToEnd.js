const use1Version = elm => {
	const range = document.body.createTextRange();
	range.moveToElementText(elm);
	range.collapse(false);
	range.select();
};

const use2Version = elm => {
	const range = document.createRange();
	range.selectNodeContents(elm);
	range.collapse(false);

	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
};

const use3Version = elm => {
	elm.focus();
	document.execCommand("selectAll", false, null);
	document.getSelection().collapseToEnd();
};

const moveCursorToEnd = elm => {
	// use3Version(elm);

	if(document.createRange)
		return use2Version(elm);
	if(document.selection)
		return use1Version(elm);

};

export default moveCursorToEnd;
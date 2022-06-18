const clearRange = () => {
	if(document.selection)
		document.selection.empty();

	if(window.getSelection)
		window.getSelection().empty && window.getSelection().empty() || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
};

const createRange = elm => {
	if(document.selection){
		const range = document.body.createTextRange();
		range.moveToElementText(elm);
		range.select().createTextRange();	
		return true;
	}

	if(window.getSelection){
		const range = document.createRange();
		range.selectNode(elm);
		window.getSelection().addRange(range);
		return true;
	}

	return false;
};

const copyHtmlToClipboard = elm => {
	clearRange();
	if(!createRange(elm)) return false;

	const copy = document.execCommand("copy");
	clearRange();
	return copy;
};

export default copyHtmlToClipboard;

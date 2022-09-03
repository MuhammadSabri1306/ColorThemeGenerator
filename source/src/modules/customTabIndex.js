import { customRef } from "vue";

const customTabIndex = propDOMIdentifier => {
	let $elmList = [];
	let $focusedElmIndex = -1;

	const customTabIndexRef = customRef((track, trigger) => {
		let $trapElm = null;
		return {
			get(){
				track();
				return $trapElm;
			},
			set(value){
				$trapElm = value;
				value ? init() : clear();
				trigger();
			}
		};
	});

	const keyHandler = event => {
		if(event.key !== "Tab" || $focusedElmIndex < 0)
			return;

		if(event.shiftKey)
			$focusedElmIndex = $focusedElmIndex - 1 < 0 ? $elmList.length - 1 : $focusedElmIndex - 1;
		else
			$focusedElmIndex = $focusedElmIndex + 1 >= $elmList.length ? 0 : $focusedElmIndex + 1;
		
		$elmList[$focusedElmIndex].focus();
		event.preventDefault();
	};

	function init(){
		if(!customTabIndexRef.value)
			return;

		const getDOMPropNumber = elm => {
			const sortNumber = elm.getAttribute ? elm.getAttribute(propDOMIdentifier) : false;
			if(sortNumber && Number(sortNumber) != NaN)
				return Number(sortNumber);
			return -1;
		};

		$elmList = Array.from(customTabIndexRef.value.querySelectorAll(`[${ propDOMIdentifier }]`))
			.sort((a, b) => getDOMPropNumber(a) - getDOMPropNumber(b))
			.filter(elm => getDOMPropNumber(elm) >= 0);

		if($elmList.length < 1)
			return;
		
		$focusedElmIndex = 0;
		document.addEventListener("keydown", keyHandler);
		$elmList[$focusedElmIndex].focus();
	}

	function clear(){
		document.removeEventListener("keydown", keyHandler);
	}

	return { customTabIndexRef, init, clear };
};

export default customTabIndex;
const isNumb = val => typeof val == "number";

const randomArrayNumber = (length, start = 0, end = 0) => {
	const result = [];
	if(length > (end - start) || !isNumb(length) || !isNumb(start) || !isNumb(end))
		return result;

	if(length === (end - start)){
		for(let i=start; i<=end; i++){
			result.push(i);
		}
		return result;
	}

	let i = 0;
	while(i < length){
		const randNum = Math.floor(Math.random() * end) + start;
		if(result.indexOf(randNum) < 0){
			result.push(randNum);
			i++;
		}
	}
	return result;
};

export default randomArrayNumber;
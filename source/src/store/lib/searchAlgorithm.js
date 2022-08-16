const searchAlgorithm = (searchText, dataLists, maxItems = 6) => {
	if(dataLists.length <= 0)
		return [];

	const searchItems = [];
	for(let i=0; i<dataLists.length; i++){

		let isMatch = false;
		if(dataLists[i].name[0] == searchText[0]){

			isMatch = true;
			let lastOrderCharIndex = 0;

			for(let j=1; j<searchText.length; j++){

				const jCharIndex = dataLists[i].name.indexOf(searchText[j]);
				if(lastOrderCharIndex < jCharIndex)
					lastOrderCharIndex = jCharIndex;
				else{
					isMatch = false;
					j = searchText.length;
				}
				
			}

		}

		if(isMatch)
			searchItems.push(dataLists[i]);

		if(searchItems.length == maxItems)
			i = dataLists.length;

	}
	return searchItems;
};

export default searchAlgorithm;
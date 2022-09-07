import searchAlgorithm from "../src/components/modules/searchAlgorithm";
import tailwindPalette from "../src/store/data/tailwindPalette";

const keyword = "slae";
const createTwNameModel = twList => {
	twList = twList.map(item => item.name);
	return twList;
};
const createTwNameOnlyModel = twList => {
	twList = twList.map(item => item.name.replace(/-?[0-9]/g, ""));
	return [...new Set(twList)];
};

const model = keyword.search(/[0-9]/) < 0 ? createTwNameOnlyModel(tailwindPalette) : createTwNameModel(tailwindPalette);

const log = () => searchAlgorithm(keyword, model, { highlight: true, marker: "<b>{value}</b>" });

export default { log };
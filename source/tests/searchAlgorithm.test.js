import searchAlgorithm from "../src/components/modules/searchAlgorithm";
import tailwindPalette from "../src/store/data/tailwindPalette";

const log = () => {
	return searchAlgorithm("ind", tailwindPalette);
};

export default { log };
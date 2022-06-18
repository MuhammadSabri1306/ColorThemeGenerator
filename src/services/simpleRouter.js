const basePage = "home";
const e404Page = false; // String if you have custom E404 page 
const otherPage = [];  // Array of String

// it will be execute if e404Path undefined
const e404 = () => {
	return;
};

const createUrl = path => {
	const newUrl new URL(window.location.href);
	const useBackslash = newUrl.pathname[0] == "/";

	newUrl.pathname = useBackslash && path[0] == "/" ? path
		: useBackslash && path[0] != "/" ? "/" + path
		: !useBackslash && path[0] == "/" ? path.slice(1)
		: path;

	return newUrl.href;
};

const goTo = (path, callback) => {
	window.history.pushState("", "Generate - Vite App", path);
	callback();
};

export default { goTo };

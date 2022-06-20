const routes = {
	"/ColorThemeGenerator/": {
		title: document.title,
		pageId: "home"
	},
	"/ColorThemeGenerator/generate": {
		title: "Generate - " + document.title,
		pageId: "generate"
	}
};

const createUrl = path => {
	const newUrl = new URL(window.location.href);
	const useBackslash = newUrl.pathname[0] == "/";

	newUrl.pathname = useBackslash && path[0] == "/" ? path
		: useBackslash && path[0] != "/" ? "/" + path
		: !useBackslash && path[0] == "/" ? path.slice(1)
		: path;

	newUrl.hash = "";
	return newUrl.href;
};

const getPageId = () => {
	let currentPath = window.location.pathname;
	
	if(currentPath[0] != "/")
		currentPath = "/" + currentPath;

	if(routes[currentPath])
		return routes[currentPath].pageId;
	return "e404";
};

const redirectTo = (path, callback = null) => {
	if(!routes[path]){
		console.error("Undefined path of routes: " + path);
		return;
	}

	window.history.replaceState("", routes[path].title, createUrl(path));

	callback && callback();
};

export default { routes, getPageId, redirectTo };

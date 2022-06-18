const routes = {
	"/": {
		title: document.title,
		pageId: "home"
	},
	"/generate": {
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

	document.title = routes[path].title;
	window.history.pushState("", routes[path].title, createUrl(path));

	callback && callback();
};

export default { routes, getPageId, redirectTo };

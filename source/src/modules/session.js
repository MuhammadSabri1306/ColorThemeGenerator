const prefix = "colorthemegenerator";
const isValid = val => typeof val == "string" && val !== "";

const buildKey = key => {
	if(!isValid(key))
		return false;
	return [prefix, ...key.split(" ")].join("-");
};

const set = (key, val) => {
	key = buildKey(key);
	
	if(key && isValid(val)){
		window.sessionStorage.setItem(key, val);
		return true;
	}

	return false;
};

const get = key => {
	key = buildKey(key);
	if(!key)
		return null;
	return window.sessionStorage.getItem(key);
};

export default { set, get };
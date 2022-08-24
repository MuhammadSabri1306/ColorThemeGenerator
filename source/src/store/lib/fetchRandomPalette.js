// documentation: http://colormind.io/api-access/
const url = "http://colormind.io/api/";
const options = {
    method: "POST",
    body: JSON.stringify({ model: "default" })
};

const fetchRandomPalette = (callback = null) => {
	fetch(url, options)
		.then(res => res.json())
		.then(res => {
			if(!res.result)
				return console.log(res);
			callback && callback(res.result);
		})
		.catch(err => console.log(err));
};

export default fetchRandomPalette;
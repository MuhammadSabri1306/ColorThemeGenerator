const testPath = "./tests";

const fs = require("fs");
esm = require("esm")({ mode: "auto" });

const runUnitTest = (testName, test) => {
	console.log("\ntest: " + testName);
	test();
	console.log("=====================\n");
};

const createUnitTest = (filename, unit) => {
	filename = filename.indexOf(".js") >= 0 ? filename.replace(".js", "") : filename;
	const name = unit.name ? unit.name : filename;
	let test = () => console.log("error to reading unit test!");

	if(unit.log){
		test = () => {
			console.log("Result:\n-------\n\n");
			console.log(unit.log());
			console.log("\n");
		};
	}

	else if(unit.expected && unit.toBe){
		test = () => {
			const expected = unit.expected();
			if(expected !== unit.toBe)
				console.log(`The result doesn't match!\n\nExpected: ${ expected }\nResult: ${ unit.toBe }`);
			else console.log(`The result is match.\n\nExpected: ${ expected }\nResult: ${ unit.toBe }`);
		};
	}

	return {
		run(){ runUnitTest(name, test) }
	};
};

const args = process.argv.slice(2).map(item => {
	if(item.indexOf(".test.js") < 0)
		return item + ".test.js";
	if(item.indexOf(".js") < 0)
		return item + ".js";
	return item;
});

const testFiles = fs.readdirSync(testPath);
const exporter = filename => {
	if(filename.indexOf(".js") >= 0 && filename != "index.js"){
		const unitTest = esm(testPath + "/" + filename).default;
		createUnitTest(filename, unitTest).run();
	}
};

const run = () => {
	if(testFiles.length < 1){
		console.log("No one Unit Test has writed yet.");
		return;
	}

	if(args.length < 1){
		testFiles.forEach(exporter);
		return;
	}

	const foundedTests = testFiles.filter(filename => args.indexOf(filename) >= 0)
	if(foundedTests.length < 1){
		console.log("Not found");
		return;
	}

	foundedTests.forEach(exporter);
};

run();
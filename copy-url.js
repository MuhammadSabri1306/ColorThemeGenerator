const clip = require("child_process").spawn("clip");
const url = "http://localhost:3000/";

clip.stdin.end(url);
console.log("Server's url was copied!");

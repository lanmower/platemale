export default (s)=>{
	var re, match, output = [];
	// re = /[A-Z]?[a-z]+/g
	re = /([A-Za-z]?)([a-z]+)/g;

	/*
	matches example: "oneTwoThree"
	["one", "o", "ne"]
	["Two", "T", "wo"]
	["Three", "T", "hree"]
	*/

	match = re.exec(s);
	while (match) {
		// output.push(match.join(""));
		output.push([match[1].toUpperCase(), match[2]].join(""));
		match = re.exec(s);
	}

	return output;
}

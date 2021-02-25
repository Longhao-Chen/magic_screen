const fs = require("fs");

class time_main{
	constructor(){
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/time.html").toString();
	}
}

module.exports = time_main;
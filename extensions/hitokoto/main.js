const fs = require("fs");

class hitokoto_main{
	constructor(){
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/hitokoto.html").toString();
	}
}

module.exports = hitokoto_main;
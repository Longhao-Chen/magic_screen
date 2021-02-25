const fs = require("fs");
const express = require("express");
var app = express();
const config = require("./config");

global.__main = {
	app: app,
	extensions: new Object()
};

//加载插件
for (var i = 0; i < config.extensions_list.length; ++i) {
	var path = './extensions/' + config.extensions_list[i] + '/main';
	var obj = require(path);
	Object.defineProperty(global.__main.extensions, config.extensions_list[i], {
		value: new obj(),
		writable: true,
		enumerable: true,
		configurable: true
	});
}

//获取主页文件
function get_html() {
	var head = fs.readFileSync("html/head.html").toString();
	var foot = fs.readFileSync("html/foot.html").toString();
	var html = "";
	html += head;
	//获取插件提供的html，按顺序
	for (var i in config.extensions_list){
		var index = config.extensions_list[i];
		html += global.__main.extensions[index].get_html();
	}
	html += foot;
	return html;
}

global.__main.app.get('/', (req, res) => {
	res.set('Content-Type', 'text/html');
	var data = get_html();
	res.send(data);
});

global.__main.app.listen(config.port)
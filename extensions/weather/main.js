const fs = require("fs");
const weather = require("./weather");

class weather_main{
	constructor(){
		global.__main.app.get('/weather', (req, res) => {
			weather.getWeather().then((data) => {
				var msg = data.description + "	" + data.temp + "&deg;C	云量:" + data.clouds + "%";
				res.send(msg);
			}).catch((err) => { res.send("服务器出现错误" +err) });
		});
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/weather.html").toString();
	}
}

module.exports = weather_main;
const calendar = require("./calendar");
const fs = require("fs");

class calender_main {
	constructor() {
		global.__main.app.get('/calendar', (req, res) => {
			var myDate = new Date();
			var date = calendar.calendar.solar2lunar();
			//实现5秒换一次
			if (myDate.getSeconds() % 10 > 4)
				res.send("公历	" + date.date + '	' + date.ncWeek);
			else
				res.send("阴历	" + date.lunarDate + '	' + date.ncWeek);
		});
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/time.html").toString();
	}
}

module.exports = calender_main;
const config = require("./config");
const cal = require("./cal");
const fs = require("fs");

class cal_main{
	constructor(){
		global.__main.app.get('/cal', (req, res) => {
			cal.getCal(config.calUrl, config.calUser, config.calPass).then((cal_data) => {
				var msg = "";
				if (cal_data.length == 0)
					res.send("近期无日程");
				else {
					for (var i = 0; i < cal_data.length; ++i)
						msg += cal_data[i];
					res.send(msg);
				}
			}).catch((err) => { res.send("服务器出现错误" + err) });
		});
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/cal.html").toString();
	}
}

module.exports = cal_main;
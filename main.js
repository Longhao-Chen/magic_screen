const fs = require("fs");
const express = require("express");
var app = express();

const config = require("./config");
const cal = require("./cal");
const weather = require('./weather');
const replace = require("./replace");
const calendar = require("./calendar");
const mail = require("./mail");
app.use('/static', express.static('static'));

//cal
app.get('/cal', (req, res) => {
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

//weather
app.get('/weather', (req, res) => {
	weather.getWeather().then((data) => {
		var msg = data.description + "	" + data.temp + "&deg;C	云量:" + data.clouds + "%";
		res.send(msg);
	}).catch((err) => { res.send("服务器出现错误" +err) });
});
//阴历
app.get('/time', (req, res) => {
	var myDate = new Date();
	var date = calendar.calendar.solar2lunar();
	//实现5秒换一次
	if (myDate.getSeconds() % 10 > 4)
		res.send("公历	" + date.date + '	' + date.ncWeek);
	else
		res.send("阴历	" + date.lunarDate + '	' + date.ncWeek);
});
//未读邮件数
app.get('/mail', (req, res) => {
	mail.get_mail_num().then(data => {
		if (data == 0)
			res.send("<p>没有未读邮件</p>");
		else
			res.send("<p class='text-success'>未读邮件：" + data + "</p>");
	}).catch((err) => { res.send("服务器出现错误" + err) });
});
//主页文件
app.get('/', (req, res) => {
	res.set('Content-Type', 'text/html');
	var data = fs.readFileSync('index.html');
	data = replace.html(data.toString(), req);	//为了支持webview
	res.send(data);
});

app.listen(config.port)
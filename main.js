const express = require("express");
var app = express();

const config = require("./config");
const cal = require("./cal");

app.use('/static', express.static('static'));

//cal
app.get('/cal', (req, res) => {
	cal.getCal(config.calUrl, config.calUser, config.calPass).then((cal_data) => {
		var msg = "";
		if (cal_data.length == 0)
			res.send("近期无日程");
		else
			for (var i = 0; i < cal_data.length; ++i)
				msg += cal_data[i] + "<br>";
		res.send(msg);
	});
})

//主页文件
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/" + "index.html");
});

app.listen(config.port)
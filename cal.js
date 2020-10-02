const ICAL = require("ical.js");
const request = require("request");

//读取文件
function readUrl(url, user, pass) {
	return new Promise(function (resolve) {
		request.get(url, {
			auth: {
				user: user,
				pass: pass
			}
		}, (err, res, body) => {
			resolve(res.body);
		})
	});
}

function getUnixTime() {
	var date = new Date();
	return date.getTime() / 1000;	//毫秒化为秒
}

//返回即将发生的事件的数组
async function getCal(url, user, pass) {
	var data = await readUrl(url, user, pass);
	data = ICAL.parse(data);	//解析读取到的数据
	var comp = new ICAL.Component(data);
	var vevent = comp.getAllSubcomponents("vevent");
	var res = new Array();
	for (var i = 0; i < vevent.length; ++i) {
		var event = new ICAL.Event(vevent[i]);
		//判断事件是否即将发生，event.startDate.toUnixTime()所提供的时间戳好像比实际的快了8小时
		if (event.startDate.toUnixTime() - 8 * 3600 - getUnixTime() < 86400 && event.startDate.toUnixTime() - 8 * 3600 - getUnixTime() > -86400)
			res.push(event.summary);
	}
	return res;
}

exports.getCal = getCal;
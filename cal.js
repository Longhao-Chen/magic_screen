const ICAL = require("ical.js");
const request = require("request");

//读取文件
function readUrl(url, user, pass) {
	return new Promise(function (resolve, reject) {
		request.get(url, {
			auth: {
				user: user,
				pass: pass
			}
		}, (err, res, body) => {
			if (err)
				reject(err);
			try{
				resolve(res.body);
			} catch (e) {
				reject(e);
			}
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
		if (event.startDate.toUnixTime() - 8 * 3600 - getUnixTime() < 86400 && event.endDate.toUnixTime() - 8 * 3600 - getUnixTime() > -86400 * 0.5){
			//如果正在发生，则进行高亮
			if(event.startDate.toUnixTime() - 8 * 3600 <= getUnixTime() && event.endDate.toUnixTime() - 8 * 3600 >= getUnixTime())
				res.push('<p class="text-success">'+event.startDate.toString() + '：' + event.summary+'</p>');
			else
				res.push('<p>'+event.startDate.toString() + '：' + event.summary+'</p>');
		}
	}
	return res;
}

exports.getCal = getCal;
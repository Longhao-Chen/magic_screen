const request = require("request");
const config = require("./config");

function readData(lat, lon, appid) {
	//纬度，经度，appid
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appid + "&lang=zh_cn";
	return new Promise(function (resolve, reject) {
		request.get(url, (err, res, body) => {
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

//将热力学温标转换为摄氏度
function tempCovn(temp) {
	return temp - 273.15;
}

async function getWeather() {
	var data = await readData(config.weather_lat, config.weather_lon, config.weather_appid);
	data = JSON.parse(data);	//关于这个数据，可以看 https://openweathermap.org/current
	res = {
		description: data.weather[0].description,	//天气的描述
		temp: tempCovn(data.main.temp).toFixed(2),	//温度
		clouds: data.clouds.all	//云量,%为单位
	}
	return res;
}

exports.getWeather = getWeather;
//更新界面上的时间
function update_time() {
	var myDate = new Date();
	document.getElementById("time").innerHTML = myDate.toLocaleTimeString();
	//每5秒更新一次，降低服务器压力
	if (myDate.getSeconds() % 5 == 0) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onload = function () {
			document.getElementById("date").innerHTML = xmlhttp.responseText;
		}
		xmlhttp.onerror = function () {
			document.getElementById("date").innerHTML = "客户端出错";
		}
		xmlhttp.open("GET", "/time", true);
		xmlhttp.send();
	}
}

//更新日程
function update_cal() {
	document.getElementById("cal").innerHTML = "更新中...";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
		document.getElementById("cal").innerHTML = xmlhttp.responseText;
	}
	xmlhttp.onerror = function () {
		document.getElementById("cal").innerHTML = "客户端出错";
	}
	xmlhttp.open("GET", "/cal", true);
	xmlhttp.send();
}

//更新天气
function updata_weather() {
	document.getElementById("weather").innerHTML = "更新中...";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
		document.getElementById("weather").innerHTML = xmlhttp.responseText;
	}
	xmlhttp.onerror = function () {
		document.getElementById("weather").innerHTML = "客户端出错";
	}
	xmlhttp.open("GET", "/weather", true);
	xmlhttp.send();
}

//更新一言
function update_hitokoto() {
	document.getElementById('hitokoto_text').innerText = "更新中...";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
		var data = JSON.parse(xmlhttp.responseText);
		document.getElementById('hitokoto_text').innerText = data.hitokoto;
	}
	xmlhttp.onerror = function () {
		document.getElementById("hitokoto_text").innerHTML = "客户端出错";
	}
	xmlhttp.open("GET", "https://v1.hitokoto.cn/?c=d&c=i&c=k&c=h", true);
	xmlhttp.send();
}

function update_theme() {
	var myDate = new Date();
	//白天
	if (myDate.getHours() >= 6 && myDate.getHours() < 22) {
		document.getElementsByTagName("body")[0].className = "container-fluid center bg-dark text-white";
	} else {
		document.getElementsByTagName("body")[0].className = "container-fluid center bg-dark text-muted";
	}
}
function update_mail() {
	document.getElementById("mail").innerHTML = "更新中...";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
		document.getElementById("mail").innerHTML = xmlhttp.responseText;
	}
	xmlhttp.onerror = function () {
		document.getElementById("mail").innerHTML = "客户端出错";
	}
	xmlhttp.open("GET", "/mail", true);
	xmlhttp.send();
}
setInterval(update_time, 500);
setInterval(update_cal, 600000);
setInterval(updata_weather, 600000)
setInterval(update_hitokoto, 610000);
setInterval(update_theme, 60000);
setInterval(update_mail, 620000);
update_time();
update_cal();
updata_weather();
update_hitokoto();
update_theme();
update_mail();

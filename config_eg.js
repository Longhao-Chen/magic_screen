//修改完后请将此文件重命名为 config.js

//server
exports.port = 8080;	//监听的端口

//cal
exports.calUrl = "";	//iCalendar文件的URL地址
exports.calUser = "";	//iCalendar文件的URL地址的访问用户名
exports.calPass = "";	//iCalendar文件的URL地址的访问密码

//weather
exports.weather_lon = "";	//经度
exports.weather_lat = "";	//纬度
exports.weather_appid = "";	//openweathermap的appid

//mail
exports.email_user = "";	//邮箱地址
exports.email_imaphost = "";	//imap服务器地址
exports.email_port = 993;	//imap服务器端口
exports.email_password = "";	//邮箱密码
exports.email_check_junk = true;	//是否检查垃圾邮件
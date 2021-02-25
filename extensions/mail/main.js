const fs = require("fs");
const mail = require("./mail");

class mail_main{
	constructor(){
		global.__main.app.get('/mail', (req, res) => {
			mail.get_mail_num().then(data => {
				if (data == 0)
					res.send("<p>没有未读邮件</p>");
				else
					res.send("<p class='text-success'>未读邮件：" + data + "</p>");
			}).catch((err) => { res.send("服务器出现错误" + err) });
		});
	}

	//相关的HTML代码
	get_html() {
		return fs.readFileSync(__dirname + "/mail.html").toString();
	}
}

module.exports = mail_main;
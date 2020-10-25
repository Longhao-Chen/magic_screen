const Imap = require("imap");
const config = require("./config");

//收件箱
function INBOX() {
	return new Promise((resolve, reject) => {
		imap.openBox('INBOX', true, (err, box) => {
			if (err) reject(err);
			imap.search(['UNSEEN'], (err, results) => {
				if (err) reject(err);
				resolve(results);
			});
		});
	});
}
//垃圾邮件
function Junk() {
	return new Promise((resolve, reject) => {
		imap.openBox('Junk', true, (err, box) => {
			if (err) reject(err);
			imap.search(['UNSEEN'], (err, results) => {
				if (err) reject(err);
				resolve(results);
			});
		});
	});
}
function get_mail_num() {
	return new Promise(async (resolve, reject) => {
		try {
			if (typeof(imap) == "undefined") {
				imap = new Imap({
					user: config.email_user,
					password: config.email_password,
					host: config.email_imaphost,
					port: config.email_port,
					tls: true,
					//debug: console.error,
					tlsOptions: { rejectUnauthorized: false } //禁用对证书有效性的检查
				});

				imap.on('ready', async () => {
					var num = 0;
					try {
						num += (await INBOX()).length;
						//如果配置了检查垃圾邮件，则检查垃圾邮件
						if (config.email_check_junk)
							num += (await Junk()).length;
						resolve(num);
					} catch (e) {
						reject(e);
					}
				});

				imap.on('error', function (err) {
					reject(err);
				});
			}

			//防止重复连接
			if(imap.state != 'authenticated')
				imap.connect();
			else {
				var num = 0;
				try {
					num += (await INBOX()).length;
					//如果配置了检查垃圾邮件，则检查垃圾邮件
					if (config.email_check_junk)
						num += (await Junk()).length;
					resolve(num);
				} catch (e) {
					reject(e);
				}
			}

		} catch (e) {
			reject(e);
		}
	})
}

exports.get_mail_num = get_mail_num;
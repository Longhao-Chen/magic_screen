const Imap = require("imap");
const config = require("./config");

var imap = new Imap({
	user: config.email_user,
	password: config.email_password,
	host: config.email_imaphost,
	port: config.email_port,
	tls: true,
	tlsOptions: { rejectUnauthorized: false } //禁用对证书有效性的检查
});

//收件箱
function INBOX() {
	return new Promise((resolve, reject) => {
		imap.openBox('INBOX', true, (err, box) => {
			if (err) throw err;
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
			if (err) throw err;
			imap.search(['UNSEEN'], (err, results) => {
				if (err) reject(err);
				resolve(results);
			});
		});
	});
}
function get_mail_num() {
	return new Promise((resolve, reject) => {
		try {
			imap.once('ready', async () => {
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

			imap.once('error', function (err) {
				reject(err);
			});

			imap.connect();
		} catch (e) {
			reject(e);
		}
	})
}

exports.get_mail_num = get_mail_num;
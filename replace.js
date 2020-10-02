//处理html中要替换的字符
function html(data, req) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
	data = data.replace(/{{fullUrl}}/g, fullUrl);
	return data;
}

exports.html = html;
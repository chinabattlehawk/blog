var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if (!port) {
	console.log('请指定端口');
	process.exit(1);
}

var server = http.createServer(function (req, res) {
	var parsedUrl = url.parse(req.url, true);
	var path = req.url;
	var query = '';
	if (path.indexOf('?') >= 0) {
		query = path.substring(path.indexOf('?'));
	}
	var pathNoQuery = parsedUrl.pathname;
	var queryObject = parsedUrl.query;
	var method = req.method;
	var charSet = 'charset=utf-8';

	console.log('得到HTTP路径为：\n' + path);
	console.log('查询字符串为：\n' + query);
	console.log('不含查询字符串的路径为：\n' + pathNoQuery);
	if (path === '/') {
		res.setHeader('Content-Type', 'text/html;' + charSet);
		res.write(
			'<DOCTYPE html>' +
			'<html>' +
			'<head>' +
			'<meta charset="UTF-8">' +
			'<link rel="stylesheet" href="/style.css">' +
			'</head>' +
			'<body>' +
			'<h1 style="color:blue;text-align: center;">Hello！欢迎！我是你二大爷！</h1>' +
			'<script src="/main.js"></script>' +
			'</body>' +
			'</html>');
		res.end();
	} else if (path === '/main.js') {
		res.setHeader('Content-Type', 'text/javascript;' + charSet);
		res.write('alert("Hello! Welcome! I am your second grandfather!")');
		res.end();
	} else if (path === '/style.css') {
		res.setHeader('Content-Type', 'text/css;' + charSet);
		res.write('body{background:gray;}');
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(port);
console.log('监听端口：' + port + '，成功！');
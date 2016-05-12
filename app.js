var http = require('http');
var setting = require('./setting.json');
getIPBySina('117.25.157.68');

function getIPBySina(ip) {
	var sinaUrl = setting.sinaApiUrl.replace('{0}', ip);
	http.get(sinaUrl, function(response) {
		var body = [];
		response.on('data', function(buffer) {
			body.push(buffer);
		}),
		response.on('end', function() {
			body = Buffer.concat(body);
        	console.log(body.toString());
		})
	});
}
var http = require('http');
var url = require('url');
var querystring = require('querystring');
//ak为百度开发者帐号给的token
var ipurl = 'http://api.map.baidu.com/location/ip?ak=...&ip={0}&coor=bd09ll';
function geturl(ip) {
  return  ipurl.replace('{0}', ip);
}

function getlocation(url2, res2) {
  http.get(url2, function(res) {
    var body = [];
    res.on('data', function(buffer) {
      body.push(buffer);
    });
    res.on('end', function() {
      body = Buffer.concat(body);
      var t = JSON.parse(body);
      console.log(t);
      //res2.send(t);
      res2.end(JSON.stringify(t));
    });
  });
}

http.createServer(function(req, res) {
  var tmp = req.url;
  console.log(tmp);
  //console.log(url);
  var urlobj = url.parse(tmp);
  var q = urlobj.query;
  console.log(q);
  var qobj = querystring.parse(q);
  console.log(qobj);
  var ip = qobj.ip || '';
  res.writeHead(200,{'Content-type': 'application/json;charset=utf-8'});
  if(ip == '') {
    res.end('please input ip');
    return;
  }

  var urlstr = geturl(ip);
  getlocation(urlstr, res);
  //res.end('success');
}).listen(8090);

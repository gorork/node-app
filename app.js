var fs = require('fs')
var qs = require('querystring');

var config = require('./config');
var User = require('./db');

var index = fs.readFile('./www/index.html');

//    var peter = new User({email: p@et.er, name: Peter, isAdmin:false});


function app(req, res) {
   if (req.url === '/'){
       res.writeHead(200, {'Content-Type': 'text/plain'});
       //res.end(index);
       res.end('Hello, World!');

   } else if (req.url === '/user' && req.method === 'POST'){

       var body = '';

       req.on('data', function (data) {
           //body += data;
           var user = data.toString();
           console.log(user);
       });

       /*req.on('end', function () {
           //callback(qs.parse(body));
           console.log(body);
       });*/

   }
}

module.exports = app;

var fs = require('fs');
var url = require('url');

var config = require('./config');
var User = require('./db');

function app(req, res) {

   if (req.url === '/'){
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('Hello, World!');

   } else if (req.url === '/user' && req.method === 'POST'){ // TEST: curl -H "Content-Type: application/json" -d '{"name":"Root","email":"I@am.root"}' http://localhost:8080/user

       req.on('data', function (data) {

           var postData = JSON.parse(data);
           console.log(postData);

           var newUser = new User(postData);
           newUser.speak();

           newUser.save(function(err){
               if (err) return console.error(err);
           })
       });

   } else if (req.method === 'GET'){ // TEST: http://localhost:8080/user/5440dc89150805964d5d9999
       res.writeHead(200, {'Content-Type': 'text/plain'});

       var id = req.url.split("/")[2];

       User.find({ _id: id }, function (err, results) {
           if (err) return console.error(err);

           console.log((results));
           var thisUser = results[0];

           res.end('Yay! This user exists:\n\nName: ' + thisUser.name + '\nEmail: ' + thisUser.email);
       });
   }
}

module.exports = app;

var fs = require('fs');
var url = require('url');

var config = require('./config');
var User = require('./db');
var ObjectId = require('mongoose').Types.ObjectId;

function app(req, res) {

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!');
    } else if (req.url === '/user' && req.method === 'POST') {
        // TEST: curl -H "Content-Type: application/json" -d '{"name":"Root","email":"I@am.root"}' http://localhost:8080/user

        // @see formidable
        var input = [];
        req.on('data', function(data) {
            // use Content-Length for bytesExpected (but may be more)
            input.push(data);

            // sum length, check > maxLength

        });

        req.on('end', function() {
            input = Buffer.concat(input).toString('utf-8');

            try {
                var postData = JSON.parse(input);
            } catch (e) {
                res.statusCode = 400;
                res.end("Bad data");
                return;
            }

            var newUser = new User(postData);
            newUser.speak();

            newUser.save(function(err) {
                if (err) {
                    throw err; // fixme: res.statusCode = 500
                }
                res.end("OK");
            })
        });


    } else if (req.method === 'GET' && req.url.match(/^\/user\//)) { // TEST: http://localhost:8080/user/5440dc89150805964d5d9999
        //res.writeHead(200, {'Content-Type': 'text/plain'});

        var id = req.url.split("/")[2];

        try {
            id = new ObjectId(id);
        } catch (e) {
            res.end("Bad id");
            return;
        }

        var promise = User.findById(id).exec();

        promise.then(function(user) {
            if (user) {
                res.end('Yay! This user exists:\n\nName: ' + user.name + '\nEmail: ' + user.email);
            } else {
                res.end("not found");
            }
        });

    } else {
        res.end('404');
    }
}

module.exports = app;


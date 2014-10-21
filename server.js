var http = require('http');
var config = require('./config');
var app = require('./app');
var server = http.createServer(app);

server.listen(config.port);

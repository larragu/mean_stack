'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var port= 3000;

//Apps
var calculatorApp = require('./apps/calculator/app');
var chatroomApp = require('./apps/chatroom/app')(io);

router.get('/',function(req,res) {
	res.send("Nothing to see here folks.");
});

router.use('/calculator',calculatorApp);

router.use('/chatroom',chatroomApp);

app.use(router);

server.listen(port,function() {
	console.log('--------------------------------');
	console.log("Server started!");
	console.log("Port: ",port);
	console.log('');
	console.log('Developer: Alex Larragueta');
	console.log('--------------------------------');
});
'use strict';

var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');

var chatroomController = require('./controller');
var Chatroom = require('./chatroom');
var chatroom = null;

function ChatApp(io) {

	//Create namespace
	var chatIO = io.of('/chatroom');
	var test = null;

	//Connect to the chatroom database
	mongoose.connect('mongodb://localhost/chatroom');

	app.use(router);

	app.use(chatroomController);

	chatIO.on('connection', function(socket){

		chatroom = new Chatroom(chatIO,socket);

		socket.on('login', function (newUsername) {

			chatroom.login(socket,newUsername);
		});

		socket.on('logOut', function() {

			chatroom.logOut(socket);
		});


		socket.on('sendMessage', function(messageData) {

			chatroom.sendMessage(socket,messageData);

		})


		socket.on('disconnect', function() {

			chatroom.disconnect(socket);

	   	});

	});



	return app;
}


module.exports = ChatApp;
'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var isNewUser = true;
var username = null;

function chatroom(io) {

	var totalUsers = 0;
	var chatIO = io.of('/chatroom');

	var formatTimestamp = function(date) {

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ':' + seconds + ampm;

		return strTime;

	}

	router.use('/libraries', express.static(path.join(__dirname,'/../../../client/browser/libraries')));

	router.use('/', express.static(path.join(__dirname,'/../../../client/browser/apps/chatroom')));

	router.use('/chat-box', express.static(path.join(__dirname,'/../../../client/browser/apps/chatroom/chat-box')));

	router.get('/',function(req,res) {

		res.sendFile(path.join(__dirname + '/../../../client/browser/apps/chatroom/index.htm'));
	})

	app.use(router);

	chatIO.on('connection', function(socket){

		if(username) {
			console.log(username, "is connected");
		}
		else {

			console.log("new user is connected");
		}

		socket.on('login', function (newUsername) {

			var messageData = {};

			if (!isNewUser) {

				socket.join(socket.id);

				chatIO.in(socket.id).emit('loggedIn', username);


				return;
			}

			username = newUsername;
			socket.join(socket.id);
			totalUsers++;
			isNewUser = false;

			chatIO.in(socket.id).emit('loggedIn', username);

	  		messageData.message = username + " has entered the room.";
	  		messageData.timestamp = formatTimestamp(new Date());
			socket.emit('messageReceived', messageData);
			socket.broadcast.emit('newMessage', messageData);

			
			//New user has joined the chatroom
			socket.broadcast.emit('userJoined', {
				username: username,
				totalUsers: totalUsers
			});

			return;
		});

		socket.on('logOut', function() {

			var messageData = {};
			messageData.timestamp = formatTimestamp(new Date());
			messageData.message = username + " has left the room.";

			console.log(messageData.message);

			//Reset user status
			isNewUser = true;
			username = null;

			socket.emit('messageReceived', messageData);
			socket.broadcast.emit('newMessage', messageData);

		});


	  socket.on('sendMessage', function(messageData) {

		if(!isNewUser) {

		  	messageData.username = username;
		  	messageData.timestamp = formatTimestamp(new Date());

			socket.emit('messageReceived', messageData);
			socket.broadcast.emit('newMessage', messageData);	

	  	}

	  })


		socket.on('disconnect', function() {

			var messageData = {};

			if(username) {

				messageData.timestamp = formatTimestamp(new Date());
				messageData.message = username + " has left the room.";

				console.log(username," is disconnected");

				username = null;
				isNewUser = true;

				socket.broadcast.emit('newMessage', messageData);
			}

	   	});

	});



	return app;
}


module.exports = chatroom;
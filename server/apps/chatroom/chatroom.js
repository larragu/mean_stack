'use strict';

var mongoose = require('mongoose');
var User = require('./models/user-schema');
var Message = require('./models/message-schema');

var Chatroom = function(newIO) {

	var chatIO = newIO;

	var isNewUser = true;

	this.login = function(socket, newUsername) {

		var messageData = {};

		//Is the user already logged in?
		if (!isNewUser) {

			return;
		}

		socket.username = newUsername;

		isNewUser = false;

		createUser(socket.id,socket.username, function() {

	  		messageData.message = socket.username + " has entered the room.";
	  		messageData.timestamp = new Date();

			messageData._id = new mongoose.mongo.ObjectID();
		  	messageData.username = "Host";

			createMessage(messageData,function() {

				socket.emit('logged in', {
					username: socket.username

				});

				//Broadcasts to all sockets in namespace
				chatIO.emit('user joined', {
					username: socket.username,
					messageData: messageData

				});
				
			});
			
		});

		return;
	}

	this.logOut = function(socket) {

		var messageData = {};

		deleteUser(socket.id,function() {

			messageData._id = new mongoose.mongo.ObjectID();
			messageData.username = "Host";
			messageData.timestamp = new Date();
			messageData.message = socket.username + " has left the room.";

			console.log(socket.username," is disconnected");

			createMessage(messageData,function() {

				//Broadcasts to all sockets in namespace
				chatIO.emit('messages', messageData);
				chatIO.emit('user left', socket.username);

				socket.username = null;
				isNewUser = true;
				
			});
		})
	}

	this.sendMessage = function(socket,messageData) {

		if(!isNewUser) {

			messageData._id = new mongoose.mongo.ObjectID();
		  	messageData.username = socket.username;
		  	messageData.timestamp = new Date();

			createMessage(messageData,function() {

				chatIO.emit('messages', messageData);
				
			});

			

	  	}

	}

	this.disconnect = function(socket) {

		//Check if user is logged in
		if(socket.username) {

			this.logOut(socket);
		}

	}

	//Adds a user into the database. Each user is identified by
	//their socket id.
	function createUser(socketId,username,callback) {

		var userData = {};
		userData._id = socketId;
		userData.username = username;

		var user = new User(userData);

		user.save(function(err,results) {

			callback()
		})

	}

	function deleteUser(socketId,callback) {

		User.findOneAndRemove({_id:socketId}, function(err){

			return callback();

		});
	}

	function createMessage(messageData,callback) {

		var message = new Message(messageData);

		message.save(function(err,results) {

			if(err) {
				console.log("message failed to save: ",err)
			}

			return callback();
		});

	}

	return this;
}

module.exports = Chatroom;
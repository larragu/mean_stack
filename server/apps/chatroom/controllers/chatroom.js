'use strict';

var mongoose = require('mongoose');
var User = require('./../models/user');
var Message = require('./../models/message-schema');

var Chatroom = function(newChatIO,newFeedIO) {

	var feedIO = newFeedIO;
	var chatIO = newChatIO;

	var isNewUser = true;

	this.login = function(socket, userData) {

		var messageData = {};
		
		socket.userData = userData;
  		messageData.message = userData.username + " has entered the room.";
  		messageData.timestamp = new Date();

		messageData._id = new mongoose.mongo.ObjectID();
	  	messageData.username = "Host";

		createMessage(messageData,function() {
console.log("socket.id: ",socket.id)
			socket.emit('logged in', {
				username: userData.username

			});

			//Broadcasts to all sockets in namespace
			feedIO.emit('user joined', {
				username: userData.username,
				messageData: messageData

			});
			
		});

		return;
	}

	this.logOut = function(socket) {

		var messageData = {};

		var userData = null;
		if(socket.request.user) {

			userData = socket.request.user;

		} else if(socket.userData) {
			userData = socket.userData;
		}

		if(userData) {

			deleteUser(userData._id,function(err) {

				messageData._id = new mongoose.mongo.ObjectID();
				messageData.username = "Host";
				messageData.timestamp = new Date();
				messageData.message = userData.username + " has left the room.";

				console.log(userData.username," is disconnected");

				createMessage(messageData,function() {

					//Broadcasts to all sockets in namespace
					feedIO.emit('messages', messageData);
					feedIO.emit('user left', userData.username);

					
				});
				
			})
		}
		//Reset's the user's front-end if multiple tabs are open
		socket.emit('logged out');
	}

	this.sendMessage = function(socket,messageData) {

  		var userSession = socket.request.user;

		if(socket.request.user && socket.request.user.logged_in) {

			User.findById(userSession._id, function (err, user) {

				if(user) {

					messageData._id = new mongoose.mongo.ObjectID();
				  	messageData.username = user.username;
				  	messageData.timestamp = new Date();

					createMessage(messageData,function() {

						feedIO.emit('messages', messageData);
						
					});

				}

			});
			

	  	}

	}

	this.disconnect = function(socket) {

		//Log out user if session expired
		//if(!socket.request.user.is_logged_in) {
			console.log("user disconnected")
			this.logOut(socket);	
	//	}	

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
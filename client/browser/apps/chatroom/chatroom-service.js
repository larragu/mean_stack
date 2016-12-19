'user strict';

angular.module('chatroomApp')

.service('chatroomService',function(socketService,Message,User) {

	var service = {};

	service.username = null;

	service.messages = [];

	service.isLoggedIn = false;

	service.totalUsers = 0;

	service.users = [];

	service.getMessages = function(callback) {

		service.messages = Message.query(function() {

			service.messages.reverse();

		})

	}

	service.getUsers = function(callback) {

		service.users = User.query(function() {

		});

	}

	service.connect = function(callback) {

		socketService.connect('/chatroom');

		socketService.mySocket.on('messages', function (messageData) {

			service.messages.push(messageData);
	   		
		});

		socketService.mySocket.on("logged in", function(userData) {

			service.username = userData.username;
			service.isLoggedIn = true;

		});

		socketService.mySocket.on("user joined", function(userData) {

			service.users.push({username:userData.username});
			service.totalUsers++;
			service.messages.push(userData.messageData);

		});

		socketService.mySocket.on("user left", function(username) {


			service.users = service.users.filter(function( obj ) {
			    return obj.username !== username
			});

			service.totalUsers--;

		});
	}

	service.login = function(newUsername) {
		if(newUsername) {
			socketService.mySocket.emit('login',newUsername);
		}
	}

	service.logOut = function() {

		socketService.mySocket.emit('logOut');

		var index = service.users.indexOf(service.username);
		if (index !== -1) {
			service.users.splice(index, 1);
		}


		service.isLoggedIn = false;
	}

	service.sendMessage = function(newMessage) {

		var newMessageData = {};
		newMessageData.username = service.username;
		newMessageData.message = newMessage;
		socketService.mySocket.emit('sendMessage',newMessageData);
		newMessage = null;
	}

	return service;

});

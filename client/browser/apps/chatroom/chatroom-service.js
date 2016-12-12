'user strict';

angular.module('chatroomApp')

.service('chatroomService',function(socketService) {

	var service = {};

	service.username = null;

	service.messages = [];

	service.isLoggedIn = false;

	service.totalUsers = 0;

	service.users = [];

	service.connect = function(callback) {

		socketService.connect();

		socketService.mySocket.on('loggedIn', function(username) {

			service.username = username;
			service.isLoggedIn = true;

			service.users.push(username);
			service.totalUsers++;

		socketService.mySocket.on('newMessage', function (messageData) {

			service.messages.push(messageData);
	   		
		});

		socketService.mySocket.on('messageReceived', function (messageData) {

			service.messages.push(messageData);
	   		
		});


		socketService.mySocket.on("userJoined", function(userData) {

			service.users.push(userData.username);
			service.totalUsers++;

		})

		socketService.mySocket.on("userLeft", function(userData) {

			var index = service.users.indexOf(userData.username);
			if (index !== -1) {
				service.users.splice(index, 1);
			}

			service.totalUsers--;

		})

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
	}

	return service;

});

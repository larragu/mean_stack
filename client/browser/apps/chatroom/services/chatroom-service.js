'user strict';

angular.module('chatroomApp')

.service('chatroomService',['socketService','Message','User','facebookService',
	'authenticationService','feedSocketService',
	function(socketService,Message,User,facebookService,
		authenticationService,feedSocketService) {

	var service = {};

	service.username = null;

	service.messages = [];

	service.isLoggedIn = false;

	service.totalUsers = 0;

	service.users = [];

	feedSocketService.on("logged out", function(userData) {

		service.username = null;
		service.isLoggedIn = false;

	});

	feedSocketService.on('messages', function (messageData) {

		service.messages.push(messageData);
   		
	});

	feedSocketService.on("user joined", function(userData) {

		service.users.push({username:userData.username});
		service.totalUsers++;
		service.messages.push(userData.messageData);	

	});

	feedSocketService.on("user left", function(username) {


		service.users = service.users.filter(function( obj ) {
		    return obj.username !== username
		});

		service.totalUsers--;

	});

	service.getMessages = function(callback) {

		service.messages = Message.query(function() {

			service.messages.reverse();

		})

	}

	service.getUsers = function(callback) {

		service.users = User.query(function() {

			service.totalUsers = service.users.length;

		});

	}

	service.connect = function(userData) {


		socketService.connect('/chatroom');

	socketService.mySocket.on("logged in", function(userData) {

		service.username = userData.username;
		service.isLoggedIn = true;
		service.connect();

	});

	}

	service.login = function(userData) {

		service.connect();
		if(userData.username) {
			socketService.mySocket.emit('login',userData);
		}
	}

	service.checkLoginStatus = function() {

		facebookService.checkLoginStatus(function(userData) {
			service.connect(userData);
			authenticationService.setToken(userData.accessToken);
			service.isLoggedIn = true;
			service.username = userData.username;


		});
	}

	service.logOut = function() {

		facebookService.logOut(function() {

			socketService.mySocket.emit('logOut');

			var index = service.users.indexOf(service.username);
			if (index !== -1) {
				service.users.splice(index, 1);
			}


			service.isLoggedIn = false;

		});

	}

	service.sendMessage = function(newMessage) {

		var newMessageData = {};
		newMessageData.username = service.username;
		newMessageData.message = newMessage;

		socketService.mySocket.emit('sendMessage',newMessageData);

		newMessage = null;
	}

	return service;

}]);

'user strict';
angular.module('chatroomApp')

.controller('chatroomCtrl',['$scope', 'chatroomService','toolboxService','facebookService',
function($scope,chatroomService,toolboxService,facebookService) {

	$scope.chatroomService = chatroomService;
	$scope.formatTimestamp = toolboxService.formatTimestamp;

	$scope.connect = function() {

		chatroomService.connect();
		chatroomService.getMessages();
		chatroomService.getUsers();

	}

	$scope.oldLogin = function(newUsername) {

		chatroomService.login(newUsername);

	}

	$scope.login = function() {

		facebookService.login(function(userData) {

			chatroomService.login(userData.username);

		});


	}

	$scope.logOut = function() {

		chatroomService.logOut();

	}

	$scope.sendMessage = function(newMessage) {

		chatroomService.sendMessage(newMessage);
	}

	$scope.connect();


}]);

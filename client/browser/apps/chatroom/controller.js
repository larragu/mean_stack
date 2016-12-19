'user strict';
angular.module('chatroomApp')

.controller('chatroomController',['$scope', 'chatroomService','toolboxService',
function($scope,chatroomService,toolboxService) {

	$scope.chatroomService = chatroomService;
	$scope.formatTimestamp = toolboxService.formatTimestamp;

	$scope.connect = function() {

		chatroomService.connect();
		chatroomService.getMessages();
		chatroomService.getUsers();

	}



	$scope.login = function(newUsername) {

		chatroomService.login(newUsername);

	}

	$scope.logOut = function() {

		chatroomService.logOut();

	}

	$scope.sendMessage = function(newMessage) {

		chatroomService.sendMessage(newMessage);
	}

	$scope.connect();


}]);

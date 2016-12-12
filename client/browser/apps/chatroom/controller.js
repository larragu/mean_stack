'user strict';
angular.module('chatroomApp')

.controller('chatroomController',['$scope','socketService', 'chatroomService',
function($scope,socketService,chatroomService) {

	$scope.chatroomService = chatroomService;

	$scope.newUsername = null;

	$scope.newMessage = null;


	$scope.connect = function() {

		chatroomService.connect();

	}



	$scope.login = function(newUsername) {

		chatroomService.login(newUsername);
		$scope.newUsername = null;

	}

	$scope.logOut = function() {

		chatroomService.logOut();

	}

	$scope.sendMessage = function(newMessage) {

		chatroomService.sendMessage(newMessage);
		$scope.newMessage = null;
	}

	$scope.connect();


}]);

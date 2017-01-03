'user strict';
angular.module('chatroomApp')

.controller('chatroomCtrl',['$scope', 'chatroomService',
	'toolboxService','facebookService','authenticationService',
function($scope,chatroomService,
	toolboxService,facebookService,authenticationService) {

	$scope.chatroomService = chatroomService;
	$scope.formatTimestamp = toolboxService.formatTimestamp;

	$scope.connect = function() {

		chatroomService.connect();

	}

	$scope.login = function() {

		facebookService.login();
	}

	$scope.initialize = function() {

		//Let socket feed connect before retrieving chat data
		setTimeout(function(){	

			chatroomService.checkLoginStatus();

			chatroomService.getMessages();
			chatroomService.getUsers();

		}, 500);


	}

	$scope.logOut = function() {

		chatroomService.logOut();

	}

	$scope.sendMessage = function(newMessage) {

		chatroomService.sendMessage(newMessage);
	}

	$scope.initialize();


}]);

'user strict';

angular.module('chatroomApp').
service('authenticationService', function () {

	var service = {};

	var token = false;

	service.getToken = function() {

		return token;

	}

	service.setToken = function(newToken) {

		token = newToken;
	}


	return service;
});
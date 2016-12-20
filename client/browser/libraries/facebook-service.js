'user strict';

angular.module('chatroomApp').
service('facebookService', function () {
  var service = {};

  service.login = function(callback) {

	FB.login(function(response) {
	    if (response.authResponse) {
	     console.log('Welcome!  Fetching your information.... ');
	     FB.api('/me', function(response) {
	       console.log('Good to see you, ' + response.name + '.');
	       console.log(response);

	       var accessToken = FB.getAuthResponse();

	       console.log("accesToken: ",accessToken);

	       var userData = {};
	       userData.accessToken = accessToken;
	       userData.username = response.name;
	       callback(userData);
	     });
	    } else {
	     console.log('User cancelled login or did not fully authorize.');
	    }
	});


  }

  return service;
});
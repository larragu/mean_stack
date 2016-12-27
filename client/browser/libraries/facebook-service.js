'user strict';

angular.module('chatroomApp').
service('facebookService',['authenticationService','$http', 
	function (authenticationService,$http) {

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1720006308238601',
	      	xfbml      : true,
	      	version    : 'v2.8',
	      	status	   : true,
	      	cookie     : true
		});
		FB.AppEvents.logPageView();
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));



	var service = {};

	service.login = function() {

        var url = 'facebook/login',
            width = 1000,
            height = 650,
            top = (window.outerHeight - height) / 2,
            left = (window.outerWidth - width) / 2;
        window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
	}


	service.checkLoginStatus = function(callback) {

		$http.get('facebook/login-status')
			.then(function(response) {

				if(response.data) {
					callback(response.data);
				}

			});
	}

	service.logOut = function(callback) {

		$http.delete('facebook')
			.then(function (response) {
				callback();
			}, function (response) {
				//Error
				console.log("logout error: ",response)

			});
	}

	return service;
}]);
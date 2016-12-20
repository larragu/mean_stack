'user strict';

angular.module('chatroomApp')

.directive('chatroom', function() {

	return {
		templateUrl: 'chatroom.htm',
		replace: true,
		restrict: 'E',
		controller: 'chatroomCtrl',
	}

})

.directive('chatHeader', function() {

	return {
		templateUrl: 'chat-header.htm',
		replace:true,
		restrict:'E',
	}
})


.directive('chatFooter', function() {

	return {
		templateUrl: 'chat-footer.htm',
		replace:true,
		restrict:'E',
	}
})
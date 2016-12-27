'user strict';

angular.module('chatroomApp')

.directive('chatroom', function() {

	return {
		templateUrl: 'views/chatroom.htm',
		replace: true,
		restrict: 'E',
		controller: 'chatroomCtrl',
	}

})

.directive('chatHeader', function() {

	return {
		templateUrl: 'views/chat-header.htm',
		replace:true,
		restrict:'E',
	}
})


.directive('chatFooter', function() {

	return {
		templateUrl: 'views/chat-footer.htm',
		replace:true,
		restrict:'E',
	}
})
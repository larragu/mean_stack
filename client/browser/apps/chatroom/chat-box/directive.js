'user strict';

angular.module('chatbox')

.directive('chatBox', function() {

	return {
		templateUrl: 'chat-box/chat-box.htm',
		replace: true,
		restrict: 'E'
	}

})

.directive('chatMessage', function() {

	return {
		templateUrl: 'chat-box/message.htm',
		replace: true,
		restrict: 'E',
		scope:true
	}

});
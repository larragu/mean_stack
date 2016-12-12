'user strict';

angular.module('chatroomApp').
service('socketService', function (socketFactory) {
  var service = {};

  service.connect = function() {

	  var myIoSocket = io.connect('/chatroom');

	  service.mySocket = socketFactory({
	    ioSocket: myIoSocket
	  });

  }

  return service;
});
'user strict';

angular.module('chatroomApp').
service('socketService', function (socketFactory) {
  var service = {};

  service.connect = function(namespace) {

	  var myIoSocket = io.connect(namespace);

	  service.mySocket = socketFactory({
	    ioSocket: myIoSocket
	  });

  }

  return service;
});
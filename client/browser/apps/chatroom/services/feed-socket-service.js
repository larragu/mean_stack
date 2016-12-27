'user strict';

angular.module('chatroomApp').
service('feedSocketService',['socketFactory', function (socketFactory) {
  var service = {};

  var myIoSocket = io.connect('/feed');

  service.mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return service.mySocket;
}]);

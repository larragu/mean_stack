'use strict';

angular.module('chatroomApp')

.service('Message', function($resource) {
  return $resource('api/chatroom/messages'); // Note the full endpoint address
})

.service('User', function($resource) {
  return $resource('api/chatroom/users'); // Note the full endpoint address
});
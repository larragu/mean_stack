'use strict';

angular.module('chatroomApp')

.service('Message', function($resource) {
  return $resource('messages'); // Note the full endpoint address
})

.service('User', function($resource) {
  return $resource('users'); // Note the full endpoint address
});
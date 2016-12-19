'user strict';

angular.module('chatroomApp').
service('toolboxService', function () {
  var service = {};

  service.formatTimestamp = function(stringDate) {

  		var date = new Date(stringDate);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var time = null;

		if(hours >= 12) {
			ampm = 'pm';
		} else {
			ampm = 'am';
		}

		hours = hours % 12;

		if(hours === 0) {
			hours = 12;
		}

		if(minutes < 10) {
			minutes = '0'+minutes
		}

		if(seconds < 10) {
			seconds = '0'+seconds
		}

		time = hours + ':' + minutes + ':' + seconds + ampm;

		return time;

	}

  return service;
});
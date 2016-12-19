'use strict';

var User = require('./models/user-schema');
var Message = require('./models/message-schema');

var chatAPI = function() {

	function getUsers(req,res) {

		User.find({},{username:1}, function(err,results) {

			res.json(results);

		});
	}

	function getMessages(req, res) {

		Message.find({},null,{limit:10,sort:{'timestamp':-1}}, function(err,results) {

			res.json(results);

		});

	}

	return {
		getUsers: getUsers,
		getMessages: getMessages
	}

}

module.exports = chatAPI();
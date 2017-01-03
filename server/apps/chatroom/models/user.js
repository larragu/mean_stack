'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema( {

	_id: String,
	username: String,
	access_token: String
});

module.exports = mongoose.model('User', userSchema);



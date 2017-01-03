'use strict';

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({

	_id: mongoose.SchemaTypes.ObjectId,
	message: String,
	username: String,
	timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema)
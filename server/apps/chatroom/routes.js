'use strict';

var express = require('express');
var router = express.Router();
var chatAPI = require('./controllers/api');
var path = require('path');

//Static files
router.use('/frameworks', express.static(path.join(__dirname,'/../../../client/browser/frameworks')));
router.use('/libraries', express.static(path.join(__dirname,'/../../../client/browser/libraries')));
router.use('/', express.static(path.join(__dirname,'/../../../client/browser/apps/chatroom')));
router.use('/chat-box', express.static(path.join(__dirname,'/../../../client/browser/apps/chatroom/chat-box')));

router.get('/',function(req,res) {
	
	res.sendFile(path.join(__dirname + '/../../../client/browser/apps/chatroom/index.htm'));
})


//API
router.get('/messages',chatAPI.getMessages);
router.get('/users',chatAPI.getUsers);

module.exports = router;



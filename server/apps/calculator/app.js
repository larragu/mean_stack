'user strict';

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname,'/../../../client/browser/apps/calculator')));

router.get('/',function(req,res) {

	res.sendFile(path.join(__dirname + '/../../../client/browser/apps/calculator/index.htm'));
})

app.use(router);

module.exports = app;
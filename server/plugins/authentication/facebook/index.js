var FacebookPasport = require('./facebook');
var User = require('./../../../apps/chatroom/models/user');

var express = require('express');
var router = express.Router();


module.exports = function(app,passport) {

    app.set('views',__dirname);
    app.set('view engine', 'ejs');

    require('./facebook')(passport);

    var api = require('./api')(passport);

    //Success
    router.get('/facebook/success', api.isAuthenticated, api.getSuccess);

    //API: Check log in status
    router.get('/facebook',api.isAuthenticated,api.getAuthentication);

    //API: Log out
    router.delete('/facebook/logout', api.logout);

    //API: Login
    router.get('/facebook/login',api.login);

    //Callback handling used after Facebook authenticated user
    router.get('/facebook/callback',api.callback);

    return router;

}
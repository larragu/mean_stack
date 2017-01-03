var FacebookPasport = require('./facebook');
var User = require('./../../../apps/chatroom/models/user');

var express = require('express');
var router = express.Router();

module.exports = function(newPassport) {

    var passport = newPassport;

    var isAuthenticated = function(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }

        //User is not authenticated
        res.status(401).send();
    }

    //Success
    var getSuccess = function(req,res) {

        res.render('after-login', { state: 'success', user: req.user ? req.user : null });

    }

    var getAuthentication = function(req,res) {
    
        res.status(200).send(req.user)

    }

    var logout = function(req,res) {

        req.logout();
        res.writeHead(200);
        res.end();
    }


    var login = passport.authenticate('facebook', { scope : 'email' });


    var callback = passport.authenticate('facebook', {
            successRedirect : 'success',
            failureRedirect : '/'
        });


    return {
        isAuthenticated: isAuthenticated,
        getSuccess: getSuccess,
        getAuthentication: getAuthentication,
        logout: logout,
        login: login,
        callback: callback
    }
}
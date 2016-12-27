var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./../../../apps/chatroom/models/user');
var facebookConfig = require('../../../config/facebook');
var facebookPassportRoutes = require('./routes');
var mongoose = require('mongoose');

var facebookPassport = function(passport,app) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : facebookConfig.appID,
        clientSecret    : facebookConfig.appSecret,
        callbackURL     : facebookConfig.callbackUrl
    },

    function(access_token, refresh_token, profile, done) {

		process.nextTick(function() {

			//Check to see if the user already exists in the database.
	        User.findOne({ '_id' : profile.id }, function(err, user) {

	            if (err) {
	                return done(err);
	            }

				//Log in existing user
	            if (user) {

	                return done(null, user);
	            } else {

	                //Create new user
	                var newUser = new User();

	                newUser._id = profile.id;                 
	                newUser.access_token = access_token;	                
	                newUser.username = profile.displayName;

	                newUser.save(function(err) {

	                    if (err)
	                        throw err;

	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

	app.use('/',facebookPassportRoutes(passport));

};

module.exports = facebookPassport;
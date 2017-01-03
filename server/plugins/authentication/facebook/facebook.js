var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./../../../apps/chatroom/models/user');
var facebookConfig = require('../../../config/facebook');
var mongoose = require('mongoose');



var FacebookPassport = function(passport) {


    passport.serializeUser(function(user, done) {

        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user) {

            done(err, user);
        });
    });


    passport.use('facebook', new FacebookStrategy({
        clientID        : facebookConfig.appID,
        clientSecret    : facebookConfig.appSecret,
        callbackURL     : facebookConfig.callbackUrl,
        profileFields: ["emails", "displayName", "name"]
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
};


module.exports = FacebookPassport;
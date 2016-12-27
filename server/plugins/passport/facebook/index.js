var facebook = require('./facebook');
var User = require('./../../../apps/chatroom/models/user');

module.exports = function(passport,app){

    passport.serializeUser(function(user, done) {

        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user) 
        
            done(err, user);
        });
    });

    //Create Passport Strategy for Facebook.
    facebook(passport,app);

}
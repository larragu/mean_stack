var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	}

	//User is not authenticated
	//TO-DO
	res.redirect('/');
}


module.exports = function(passport){

	//Success
	router.get('/facebook/success', isAuthenticated, function(req, res){

		res.render('after-login', { state: 'success', user: req.user ? req.user : null });
	});

	//API: Check log in status
	router.get('/facebook/login-status',function(req,res) {

		res.status(200).send(req.user)
	})

	//API: Log out
	router.delete('/facebook', function(req, res) { 

	    req.logout();
	    res.writeHead(200);
	    res.end();
	});

	//API: Login
	router.get('/facebook/login', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	//Callback handling used after Facebook authenticated user
	router.get('/facebook/login/callback',
		passport.authenticate('facebook', {
			successRedirect : '/chatroom/facebook/success',
		})
	);

	return router;
}
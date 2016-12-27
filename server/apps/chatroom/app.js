'use strict';

var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');


var chatroomRoutes = require('./routes');
var Chatroom = require('./controllers/chatroom');
var chatroom = null;

// Configuring Passport
var passport = require('passport');
var passportSocketIo = require('passport.socketio');
var session = require('express-session');

var cookieParser = require('cookie-parser');

function ChatApp(io) {

	var sessionStore = new (require("connect-mongo")(session))({
        url: "mongodb://localhost/chatroom",
    	collection: 'sessions'
  })

	app.use(cookieParser('your secret here'));

	app.use(session({
		secret: 'secrettexthere',
		saveUninitialized: true,
		resave: true,
		store: sessionStore
	}));


	//Create namespaces
	var chatIO = io.of('/chatroom');
	var feedIO = io.of('/feed');

	chatIO.use(passportSocketIo.authorize({
	  key: 'connect.sid',
	  secret: 'secrettexthere',
	  store: sessionStore,
	  passport: passport,
	  cookieParser: cookieParser
	}));


	//Initialize Passport
	app.use(passport.initialize());
	app.use(passport.session());


	var facebookPassport = require('./../../plugins/passport/facebook');
	facebookPassport(passport,app);

	app.set('views',__dirname+'./../../plugins/passport/facebook/');
    app.set('view engine', 'ejs');


	//Connect to the chatroom database
	mongoose.connect('mongodb://localhost/chatroom');

	app.use(router);

	app.use(chatroomRoutes);


	//Used for viewing data
	feedIO.on('connection', function(socket){

		console.log("feed connected!: ",socket.id)
	});


	//Used for writing data
	chatIO.on('connection', function(socket){

		console.log("chat connected!")

		chatroom = new Chatroom(chatIO,feedIO);

		socket.on('login', function (userData) {

			chatroom.login(socket,userData);
		});

		socket.on('logOut', function() {
			chatroom.logOut(socket);
		});


		socket.on('sendMessage', function(messageData) {

			if (socket.request.user && socket.request.user.logged_in) {

				chatroom.sendMessage(socket,messageData);
			}
						

		})

		socket.on('disconnect', function() {

			//chatroom.disconnect(socket);

	   	});

	});

	return app;
}


module.exports = ChatApp;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Sequelize = require('sequelize');
													//password - mine didn't have one
var sequelize = new Sequelize('workoutlog', 'postgres', ' ', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(){
		console.log(err);
	}
);

// User model created using sequelize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING
});

// creates the table in postgres
User.sync(); // User.sync({ force: true }); // drops the table and recreates it

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.post('/api/user', function(req, res){

	var username = req.body.user.username;
	var pass = req.body.user.password; // TODO: hash this password

	// Hey database, make this using the User model
	User.create({
		username: username,
		passwordhash: '' // TODO: make it hashed
	}).then(
		function createSuccess(user) {
			res.json({
				user: user,
				message: 'created'
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

app.use('/api/test', function(req, res){
	res.send("hello world");
});

app.listen(3000, function(){
	console.log('app is binge watching Netflix on port 3000');
});


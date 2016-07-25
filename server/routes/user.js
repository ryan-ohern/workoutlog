var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){

	// values of user input are assigned to variables
	var username = req.body.user.username;
	var pass = req.body.user.password;

	// User model communicates with Postgres to create a new user
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10)
	}).then(
		function createSuccess(user) {
			// after user is created, assign a token to user
			var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
			// respond with a json string including user's token
			res.json({
				user: user,
				message: 'created',
				sessionToken: token
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

router.get('/', function(req, res){
	var username = req.user.username;
	User
		.findAll({
			where: { username: username}
		})
		.then(
			function findAllSuccess(data){
				res.json(data);
				console.log(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;
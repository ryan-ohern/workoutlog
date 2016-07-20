var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){

	var username = req.body.user.username;
	var pass = req.body.user.password;

	// User model communicates with Postgres to create a new user
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10)
	}).then(
		function createSuccess(user) {
			var token = jwt.sign({ id: user.id }, "shh_I_am_secret", { expiresIn: 60*60*24 } );
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

module.exports = router;
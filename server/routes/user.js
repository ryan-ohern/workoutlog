var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');

router.post('/', function(req, res){

	var username = req.body.user.username;
	var pass = req.body.user.password; // TODO: hash this password

	// User model communicates with Postgres to create a new user
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

// router.route(/user)

module.exports = router;
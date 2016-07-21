var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

// User @ Login Screen
router.post('/', function(req, res) {
	// Looks in database to see if any username in db matches username in request
	User.findOne( { where: { username: req.body.user.username } } ).then(
		function(user) {
			if (user) {
				// compares encrypted password typed in with password in database
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
						// if matches, assign user a token with a secret signature
						var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
						// send back json string with user info, message & token
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					} else {
						res.status(500).send({ error: "failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate" });
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router;
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
	// assigns authorization token in header to sessionToken	
	var sessionToken = req.headers.authorization;
	// if we don't have a user object in the body (ex. login route)
	if (!req.body.user && sessionToken) {
		// verifies the token and secret signature and decodes it
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded) {
			if (decoded) {
				// if it's decoded, find the user in the db with a decoded.id
				User.findOne({ where: { id: decoded.id } }).then(
					// then assign the resulting user to the req.user so we don't have to parse the body every time we want to access the user object
					function(user) {
						req.user = user;
						next();
					},
					function() {
						res.status(401).send({error: 'you are not authorized' });
					}
				);
			} else {
				res.status(401).send({error: 'you are not authorized' });
			}
		});
	} else {
		// tells app.use to go to next app.use
		next();
	}
};
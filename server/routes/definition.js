var router = require('express').Router();
var sequelize = require('../db');
var Definition = require('../models/definition');

// create a definition
router.post('/', function(req, res){
	// creating variables from inputted data on DOM
	var descrption = req.body.definition.description;
	var logType = req.body.definition.type;
	// because we won't have a field where they input their user id
	// defined in validate-session.js
	var owner = req.user.id;

	Defintion.create({
		description: description,
		logType: logType,
		owner: owner
	}).then(
		// if successfull, we get entire definition to pass into function
		function createSuccess(definition) {
			res.json({
				// sending our posting results back to us
				definition: definition,
				message: 'created'
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

// fetch definitions by user id
router.get('/', function(){
	Defintion.findById({ where: { id: user.id } }).then(
		function createSuccess(user){
			res.json({
				user: user.definition
			});
		}
	);
});

module.exports = router;
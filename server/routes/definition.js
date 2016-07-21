var router = require('express').Router();
var sequelize = require('../db');
var Definition = sequelize.import('../models/definition');

// create a definition
router.post('/', function(req, res){
	// creating variables from inputted data on DOM
	var descrption = req.body.definition.desc;
	var logType = req.body.definition.type;
	// because we won't have a field where they input their user id
	// defined in validate-session.js
	var owner = req.user.id;

	Defintion
		.create({
			description: description,
			logType: logType,
			owner: owner
		})
		.then(
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

// fetch definitions of a given owner by user id
router.get('/', function(req, res){
	var owner = req.user.id; // shortify :)
	Defintion
		.findAll({
			// find definitions where owner variable (requested user id) matches owner in db
			where: { owner: owner }
		})
		.then(
			function findAllSuccess(data){
				// send on all data from query
				res.json(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);

});

module.exports = router;
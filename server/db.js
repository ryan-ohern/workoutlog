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

var User = sequelize.import('./models/user');

module.exports = sequelize;
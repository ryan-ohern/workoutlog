module.exports = function(sequelize, DataTypes) {

	// log model for new table in postgres created using sequelize
	var Log = sequelize.define('log', {
		description: DataTypes.STRING, // notes on workout
		result: DataTypes.STRING, // actual workout results
		owner: DataTypes.INTEGER, // user id of owner
		def: DataTypes.STRING // string of definition
	});

	return Log;
};
// definition model needs description, logtype, and an owner

module.exports = function(sequelize, DataTypes) {

	// definition model for new table in postgres created using sequelize
	return sequelize.define('definition', {
		description: { type: DataTypes.STRING, unique: true },
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
	});
};

/*
{ 
	definition: {
		description: "run 5k",
		logType: "byTime"
		owner: 1 // user id of who created it
	}
}
*/
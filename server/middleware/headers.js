module.exports = function(req, res, next){
	// allows api to be accessed by browsers or other elements outside of port 3000
	res.header('access-control-allow-origin', '*');
	// GET, POST, PUT & DELETE are allowed on this API
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
	res.header('access-control-allow-headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
};


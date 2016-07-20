// allows api to be accessed by browsers or other elements outside of port 3000
module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*');
	next();
};


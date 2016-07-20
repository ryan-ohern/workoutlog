var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// we moved the sequalize to db.js
var sequelize = require('./db.js');

// creates the table(s) in postgres
sequelize.sync(); // sequelize.sync({ force: true }); // drops the table and recreates it

app.use(bodyParser.json());

// allows api to be accessed by browsers or other elements outside of port 3000
app.use(require('./middleware/headers'));

// create user route
app.use('/api/user', require('./routes/user'));

// Test route for api http://localhost:3000/api/test
app.use('/api/test', function(req, res){
	res.send("hello world");
});

app.listen(3000, function(){
	console.log('app is binge watching Netflix on port 3000');
});


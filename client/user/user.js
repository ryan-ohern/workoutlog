$(function(){

// $("#welcome").hide();

// calls to api to return user info
var getUsername = $.ajax({
	type: "GET",
	url: WorkoutLog.API_BASE + "user",
	headers: {
	"Authorization": window.localStorage.getItem("sessionToken")
	}
	// success: function(data){
	// 	userInfo = data;
	// 	username = userInfo[0].username;
	// 	// inputs username to dom
	// }
}).done(function(data){
	console.log("you made it this far");
	userInfo = data;
	username = userInfo[0].username;
	// inputs username to dom
	$("#welcome").text("Welcome, " + username);
});


});
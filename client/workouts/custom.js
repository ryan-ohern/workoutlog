$(function(){

var getUsername = $.ajax({
	type: "GET",
	url: WorkoutLog.API_BASE + "user",
	headers: {
	"Authorization": window.localStorage.getItem("sessionToken")
	}
});

getUsername.done(function(data){
	console.log("you made it this far");
	userInfo = data;
	username = userInfo[0].username;
	$("#welcome").text(username);
});

});
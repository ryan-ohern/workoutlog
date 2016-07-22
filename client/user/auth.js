$(function() {
	$.extend( WorkoutLog, {
		afterSignin: function(sessionToken) {
			// set global auth header authorization with token
			WorkoutLog.setAuthHeader(sessionToken);
			WorkoutLog.definition.fetchAll();
			WorkoutLog.log.fetchAll();
			$(".disabled").removeClass("disabled");
			// change text of nav bar "login" to "logout"
			$("#loginout").text("Logout");
		},

		signup: function() {
			// pulls info from DOM and creates variables
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			// creates object from variables
			var user = {
				user:  {
					username: username,
					password: password
				}
			};
			
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user", 
				data: JSON.stringify(user), 
				contentType: "application/json"
			});		// run this promise after signup post is done
			
			signup.done(function(data) {
				// if you succesully sign up and recieve a token
				if (data.sessionToken) {
					// hide sign-up modal
					$("#signup-modal").modal("hide");
				}
				// go to define tab after sign up
				$('.nav-tabs a[href="#define"]').tab('show');
			})
			.fail(function() {
				$("#su_error").text("There was an issue with your username").show();
			});
		},

		login: function() {
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user:  {
					username: username,
					password: password
				}
			};
			var login = $.ajax({
				type: "POST", 
				url: WorkoutLog.API_BASE + "login", 
				data: JSON.stringify(user), 
				contentType: "application/json"
			});
			login.done(function(data) {
				if (data.sessionToken) {
					// call function (part of refactoring)
					WorkoutLog.afterSignin(data.sessionToken);
					$("#login-modal").modal("hide");
				}
			})
			.fail(function() {
				$("#li_error").text("There was an issue with your username or password").show();
			});
		},

		loginout: function() {
			// if we are logged in and we click the logout button, remove token
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
			// TODO: on logout, make sure things are disabled
		}
	});

	// bind events
	// makes an ajax call based on which button you click
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	// if I refresh my browser while logged in, this immediately changes the loginout button to "logout" (it is "login" by default) because you are still logged in
	if (window.localStorage.getItem("sessionToken")) {
		$("#loginout").text("Logout");
	}

});
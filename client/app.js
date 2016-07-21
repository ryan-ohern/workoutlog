$(function() {
	var WorkoutLog = (function($, undefined) {
		var API_BASE =  "http://localhost:3000/api/";
		var userDefinitions = [];

		var setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken);
			// Set the authorization header
			// This can be done on individual calls
			// here we showcase ajaxSetup as a global tool
			$.ajaxSetup({
				"headers": {
				"Authorization": sessionToken
				}
			});
		};

		// public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};
	})(jQuery);

	// Ensure .disabled aren't clickable // TODO: look through this code
	$(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
		var token = window.localStorage.getItem("sessionToken");
		if ($(this).hasClass("disabled") && !token) {
			e.preventDefault();
			return false;
		}
	});

	// bind tab change events (shows logs, calls function "setDefinitions" in log.js)
	$("a[data-toggle='tab']").on("shown.bs.tab", function(e){
		// sees which tab is targeted
		var target = $(e.target).attr("href");
		if (target === "#log") {
			WorkoutLog.log.setDefinitions();
		}
	});

	// setHeader if we have a session (refresh of browser)
	var token = window.localStorage.getItem("sessionToken");
	if (token) {
		WorkoutLog.setAuthHeader(token); 
	}

	// expose this to the other workoutlog modules
	window.WorkoutLog = WorkoutLog;

});
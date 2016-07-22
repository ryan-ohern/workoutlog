$(function(){
	$.extend(WorkoutLog, {
		// everything chained off an object called log (so we can pass all log info in one object)
		log: {
			workouts: [],
			// going to add new options to select element on log screen
			setDefinitions: function(){
				// grabs the user definition from req user and assigns to "defs"
				var defs = WorkoutLog.definition.userDefinition;
				var len = defs.length;
				// will eventually loop through and append to select options dropdown
				var opts = "";
				for (var i = 0; i < len; i++) {
					opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
				}
				// removes existing labels prior to appending definitions again
				$("#log-definition").children().remove();
				// adds to html after "log definition" - which is the label
				$("#log-definition").append(opts);
			},

			setHistory: function(){
				var history = WorkoutLog.log.workouts;
				var len = history.length;
				// will eventually loop through and append to select options dropdown
				var lis = "";
				for (var i = 0; i < len; i++) {
					lis += "<li class='list-group-item'>" + history[i].def + " - " + history[i].result + "</li>";
				}
				// removes existing labels prior to appending history
				$("#history-list").children().remove();
				$("#history-list").append(lis);
			},

			create: function(){
				var itsLog = {
					desc: $("#log-description").val(),
					result: $("#log-result").val(),
					// uses value of option selected
					def: $("#log-definition option:selected").text()
				};
								// server is expecting an object called "log"
				var postData = { log: itsLog };
				var logger = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				// ensure that the response has occurred before running this code
				logger.done(function(data){
					WorkoutLog.log.workouts.push(data);
				});

				logger.fail(function(){
					console.log("friend. we have a problem.");
				});
			},

			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					}

				});
				fetchDefs.done(function(data) {
					WorkoutLog.log.workouts = data;
				});
				fetchDefs.fail(function(err) {
					console.log("an error occured" + err.message);
				});
			}
		}
	});

	// button that makes ajax call
	$("#log-save").on("click", WorkoutLog.log.create);
	// $("#history").on("click", WorkoutLog.log.setHistory);

	// if I refresh page and I have a valid session token, fetch all logs
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.log.fetchAll();
	}
});


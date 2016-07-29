// TODO
// Add notes to history - maybe a button that pops up box with notes??
// Add update feature
// Add landing page
// Allow for same defines between users
var index;
$(function(){
	// hide success & fail messages
	$("#log-success").hide();
	$("#log-fail").hide();
	$("#define-delete-success").hide();
	$("#define-delete-fail").hide();
	$("#log-delete-success").hide();
	$("#log-delete-fail").hide();

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
					lis += "<li class='list-group-item'>" + 
					// history[i].id + " - " + 
					history[i].def + " - " + 
					history[i].result + " " +
					// pass the log.id into the button's id attribute // watch your quotes!
					"<button id='" + history[i].id + "' class='remove'><strong>X</strong></button></li>";
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
					// show success
					// $("#log-success").show().delay(3000).hide();
					$("#log-success").fadeIn("slow", function(){
						$("#log-success").delay(3000).fadeOut();
					});
					// clear inputted fields
					$("#log-result").val("");
					$("#log-description").val("");
				});

				logger.fail(function(){
					console.log("friend. we have a problem.");
					// $("#log-fail").show().delay(3000).hide();
					$("#log-fail").fadeIn("slow", function(){
						$("#log-fail").delay(3000).fadeOut();
					});
				});
			},
			
			delete: function(){
				var thisLog = {
						// "this" is the button on the li
						// .attr("id") targets the value of the id attribute of button
					id: $(this).attr("id")
				};
				var deleteData = { log: thisLog };
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				// removes list item
				// references button then grabs closest li
				$(this).closest("li").remove();

				// deletes item out of workouts array
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == thisLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				deleteLog.fail(function(){
					console.log("nope. you didn't delete it.");
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
	
	// has to target id of ul b/c li items are dynamic
	$("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);
	
	// if I refresh page and I have a valid session token, fetch all logs
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.log.fetchAll();
	}
});




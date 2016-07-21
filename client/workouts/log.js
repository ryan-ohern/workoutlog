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
				var opts;
				for (var i = 0; i < len; i++) {
					// if (defs[i].description != opts)
					opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
				}
				// adds to html after "log definition" - which is the label
				$("#log-definition").append(opts);
			}
		}
	});
});
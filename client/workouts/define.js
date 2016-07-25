$(function(){
	
	$("#define-success").hide();
	$("#define-fail").hide();
	// takes WorkoutLog object and merges in another module on top of it
	$.extend(WorkoutLog, {
		definition: {
			userDefinition: [],
			// updating the array with new additions
			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data){
					WorkoutLog.definition.userDefinition.push(data.definition);
					$("#define-success").fadeIn();
				});
				define.fail(function(){
					console.log("yea...so...that didn't work");
					$("#define-fail").fadeIn();
					// $("#define_error").text("There was an issue with your definition").show();
				});
			},
			fetchAll: function(){
				var getDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					// explictly sending header with request
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data){
					// return data from our Definition.findAll query
					WorkoutLog.definition.userDefinition = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}
		}
	});





	// bind events
	// makes an ajax call based on which button you click
	$("#def-save").on("click", WorkoutLog.definition.create);
	// $("#def-save").on("click", WorkoutLog.definition.fetchAll);

	// if page is refreshed or at login and sessionToken is valid, fetch all
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});
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
					// show success
					$("#define-success").fadeIn();
					// clear inputted fields
					$("#def-description").val("");
				});
				define.fail(function(){
					console.log("yea...so...that didn't work");
					$("#define-fail").fadeIn();
				});
			},

			delete: function(){
				var thisDefId = {
					id: $("#log-definition").find("option:selected").val()
				};
				// parseInt(thisDef);
				var deleteData = { definition: thisDefId };
				console.log(deleteData);
				var deleteDefinition = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});
				
				$("select option:selected").text("");
				$("select option:selected").hide();

				deleteDefinition.fail(function(){
					console.log("nope. you didn't delete category.");
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
	$("#delete-category").on("click", WorkoutLog.definition.delete);
	// TODO - working on deleting options
	/*$("#delete-category").click(function(){
		$("select option:selected").text("");
		$("select option:selected").hide();
	});*/

	// $("#delete-category").click(function(){
	// 	$("#log-definition").find("option:selected").hide();
	// });

	// if page is refreshed or at login and sessionToken is valid, fetch all
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});
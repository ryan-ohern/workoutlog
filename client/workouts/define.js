$(function(){
	// hide success & fail messages
	$("#define-success").hide();
	$("#define-fail").hide();
	// takes WorkoutLog object and merges in another module on top of it
	$.extend(WorkoutLog, {
		definition: {
			// mine is singular - yours might be "userDefinitions"
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
					// $("#define-success").show().delay(3000).hide();
					$("#define-success").fadeIn("slow", function(){
						$("#define-success").delay(3000).fadeOut();
					});
					// clear inputted fields
					$("#def-description").val("");
				});
				define.fail(function(){
					console.log("yea...so...that didn't work");
					// $("#define-fail").show().delay(3000).hide();
					$("#define-fail").fadeIn("slow", function(){
						$("#define-fail").delay(3000).fadeOut();
					});
				});
			},

			delete: function(){
				var thisDefId = {
					// targets select element, then traverses down to find value of option that's selected
					id: $("#log-definition").find("option:selected").val()
				};
				var deleteData = { definition: thisDefId };
				var deleteDefinition = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});
				
				// removes value and hides option
				$("select option:selected").text("");
				$("select option:selected").hide();
				$("#define-delete-success").fadeIn("slow", function(){
					$("#define-delete-success").delay(3000).fadeOut();
				});

				// removes option (definition) from array
				for(var i = 0; i < WorkoutLog.definition.userDefinition.length; i++){
					if(WorkoutLog.definition.userDefinition[i].id == thisDefId.id){
						WorkoutLog.definition.userDefinition.splice(i, 1);
					}
				}

				deleteDefinition.fail(function(){
					console.log("nope. you didn't delete category.");
					$("#define-delete-fail").fadeIn("slow", function(){
						$("#define-delete-fail").delay(3000).fadeOut();
					});
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
	
	// targets id of "Delete Category" span
	$("#delete-category").on("click", WorkoutLog.definition.delete);

	// if page is refreshed or at login and sessionToken is valid, fetch all
	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});
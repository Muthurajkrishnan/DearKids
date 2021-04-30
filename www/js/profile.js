GetIProfile();

//Get Event
function GetIProfile() {

	var cur_id = storage.getItem('CustomeurId');
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/getPrfiyLE",
		data: {eventIuD:cur_id},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data[0];		
				
				$('#prf-Name').html(finalData.firstName);							
				$('#prf-Email').html(finalData.emailId);

				var profImg = finalData.profilePhoto;
				if( profImg != null)
					$('#prf-img').attr("src", config_url+'/storage/'+profImg);					
			}else{
				$('#profileDiv').html('<div class="inner-child-div"><h3 class="text-danger"><small>Profile Not available...</small></h3></div>');
			}
		}
	});		

}
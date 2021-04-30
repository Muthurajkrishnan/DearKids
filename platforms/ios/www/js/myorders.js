GetIProfile();

//Get Event
function GetIProfile() {

	var cur_id = storage.getItem('CustomeurId');
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/getCusToarder",
		data: {eventIuD:cur_id},
		success: function (autput) {
			if (autput.success) {
				$('#orders_list').html(autput.data);
			}else{
				$('#orders_list').html('<div class="inner-child-div"><h3 class="text-danger"><small>No Orders...</small></h3></div>');
			}
		}
	});		

}
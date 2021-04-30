GetIEvent();

//Get Event
function GetIEvent() {

	var cur_id = storage.getItem('eVantPage');

	if(storage.getItem('eVantPage') == "" || storage.getItem('eVantPage') == null)
	{
		window.location.href="events.html";
	}
	
	storage.removeItem('eVantPage');
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/getEvanTDS",
		data: {eventIuD:cur_id},
		success: function (autput) {
			if (autput.success) {
				console.log(autput.data)
				var finalData = autput.data[0];
				var eventImage = finalData.eventImage;
				if(eventImage != null){
					$('.card-img-top').attr('src',config_url + "/storage/" + eventImage);
				}			
				
				$('.card-title').html(finalData.place);			
				$('.card-text').html(finalData.event_date);			
				$('.card-header').html(finalData.event_name);			
			}else{
				$('#event_render').append('<div class="inner-child-div"><h3 class="text-danger"><small>Event Not available...</small></h3></div>');
			}
		}
	});		

}
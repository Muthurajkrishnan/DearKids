GetAllEvents();

//Get Categories
function GetAllEvents() {
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/getEvanTDS",
		data: {},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
				for(var k=0; k<finalData.length; k++){
					$('#event_render').append('<div class="inner-child-div text-center"><h3><a href="javascript:;" onClick="sETeVentpAge('+finalData[k].id+')">'+finalData[k].event_name+'<br/><span class="badge badge-info">'+finalData[k].event_date+'</span><br/><span class="badge badge-dark">'+finalData[k].place+'</span></a></h3></div>');
				}				
			}else{
				$('#event_render').append('<div class="inner-child-div"><h3 class="text-danger"><small>Events Not available...</small></h3></div>');
			}
		}
	});		

}

function sETeVentpAge(paGeiiD){
	storage.setItem('eVantPage', paGeiiD);
	window.location.href="event_ind.html"
}
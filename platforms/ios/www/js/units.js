 var config_url = "";
 
 var admin_url = "http://calconics.com/wmsaDmin/";

 var storage = window.localStorage;

$(document).ready(function() {
 
if(storage.getItem('CompanyID') == "undefined" &&  storage.getItem('CompanyID') == null)
{
	window.location.href="index.html";
}

//Get Company URL 
LoadUnits();

$('#UnitName').html(storage.getItem('CompanyName'));	
  
});

function LoadUnits(){
//Load Units
 var UnlitList = [1,2];
 var UnlitNameList = ['CBSE Unit','Hostel Unit'];					     			
 
 for(var l=0; l<UnlitList.length; l++){
	 var UnitnamE = UnlitNameList[l];
	 var UnitiD = UnlitList[l];
	 $('#unitsList').append('<div class="list-group-item clearfix unitsListItem"><span class="countNumber">'+(l+1)+'. </span><span class="UnitnamE">'+UnitnamE+'</span><span class="float-right"><button class="btn btn-xs btn-warning GoUnit" onclick="ChangeUnit(\''+UnitiD+'\',\''+UnitnamE+'\')">GO</button></span></div>');
 }
 
//config_url = data.uniturl;
//get_tank_data();
show_loader(0);
}
 
 
//For Goto Units

function ChangeUnit(UNITid,UNITnAme) {
	storage.setItem('CompanyID1',UNITid);
	storage.setItem('CompanyName',UNITnAme);
    window.location.href = "dash.html";	
}

//Show/Hide Loader	
function show_loader(loader_wms){
	if(loader_wms == 0){
		$('#tank_body_section').show();
		$('.loader_div').hide();
	}	
}	

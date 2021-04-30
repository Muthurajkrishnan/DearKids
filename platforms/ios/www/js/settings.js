 var config_url = "";
 
 var admin_url = "http://calconics.com/wmsaDmin/";

 var storage = window.localStorage;
 
 var curdevid = storage.getItem('RegisteredID');
 
$(document).ready(function() {
 
 if(storage.getItem('CompanyID') == "" || storage.getItem('CompanyID') == null)
{
	window.location.href="index.html";
}
 
//Get Company URL 
getCompanyUrl();
  
});


//For Get URL Settings
    function getCompanyUrl() {

		var unitid = storage.getItem('CompanyID');		
		//console.log("dev"+curdevid);
		$('input[name=DevId]').val(curdevid);
		
        $.ajax({
            type: "GET",
            dataType: "JSON",
			crossDomain: true,
			url: admin_url + "checklogin.php?uniturl="+ unitid,
            data: {},
            success: function (data) {
				if (data.success) {					
					config_url = data.uniturl;
					get_tank_data();
				}
				else{
					alert('Account Expired');
					storage.removeItem('CompanyID');
					storage.removeItem('showhidetanks');
					storage.removeItem('CompanyName');
					window.location.href = "index.html";
				}
			}
        });		

	} 


//For Get Admin Settings
    function get_tank_data() {
		var company_ID = "VELAL";
		var CompanyID1 = storage.getItem('CompanyID1');
		if(CompanyID1 == 2)
			extraVar = "_bed";		
        $.ajax({
            async: true,
            type: "GET",
			crossOrigin: true,
            dataType: "JSON",
			url: config_url + "tank_data"+extraVar+".php?all_tanks=1&company="+company_ID+"&DevId="+$('input[name=DevId]').val(),
			success: function (data) {
				var showhidetanks = JSON.parse(storage.getItem('showhidetanks'));
				var checked = "";
				
				var tank_name = data.tank_name;
				var tank_details = data.tank_details;
				
				for(var k=1; k<tank_name.length; k++){
					
					if(showhidetanks != null && showhidetanks.length > 0){
						checked = "checked";
						if (showhidetanks.indexOf(k) == -1){							
							checked = '';
						}
					}					
					
					$('#tanks_number').append('<div class="checkbox checkbox-warning"><input onchange="set_visible_tank('+k+')" id="checkbox'+k+'" type="checkbox" '+checked+'><label for="checkbox'+k+'">'+tank_name[k]+'</label></div>');				
					
					if(k != 3)					
					$('#tank_limit_list').append('<div class="form-group col-6"><label for="tank_lim_no'+k+'">'+tank_name[k]+'</label><input type="number" name="Tank_name['+k+']" class="form-control" id="tank_lim_no'+k+'" value="'+tank_details[k]+'" /></div>');
				}
			}
		});
	}


//Set Tank Show / Hide
function set_visible_tank(curbox){

	var showhidetanks = JSON.parse(storage.getItem('showhidetanks'));
	//console.log(showhidetanks);
	var ifexist = -1;
	
	
	if(showhidetanks != null){
		var ifexist = showhidetanks.indexOf(curbox);
	}else{
		var showhidetanks = [];
	}
	
	if($('#checkbox'+curbox).prop("checked") == true){		
		if (ifexist > -1) {
		  showhidetanks.splice(ifexist, 1);
		  showhidetanks.push(curbox);
		}else{
			showhidetanks.push(curbox);
		}			
	}else{
		if (ifexist > -1) {
		  showhidetanks.splice(ifexist, 1);
		}		
	}
	
	storage.setItem('showhidetanks',JSON.stringify(showhidetanks));

}

//Set Tank Limit
function set_tank_limit(){
	
	var TankLimits = $('#TankLimitForm').serialize();
	
	$.ajax({
		async: true,
		type: "GET",
		crossOrigin: true,
		dataType: "JSON",
		url: config_url + "tank_data_bed.php?tankLimits=1&"+TankLimits,
		success: function (data) {
			$('#tank_Limit_col').click();
		}
	});
		
}
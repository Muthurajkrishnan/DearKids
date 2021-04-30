 var config_url = "";
 
 var admin_url = "http://calconics.com/wmsaDmin/";

 var storage = window.localStorage;

$(document).ready(function() {
	
setInterval(function() {
  get_tank_data();
}, 30000);	
 
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
					storage.removeItem('RegisteredID');
					window.location.href = "index.html";
				}
			}
        });		

	} 
 
 
//For Get Admin Settings
    function get_tank_data() {
		var company_ID = "VELAL";
		var extraVar = "";
		var CompanyID1 = storage.getItem('CompanyID1');
		if(CompanyID1 == 2)
			extraVar = "_bed";
        $.ajax({
            async: true,
            type: "GET",
			crossOrigin: true,
            dataType: "JSON",
			url: config_url + "tank_data"+extraVar+".php?tank_data=1&company="+company_ID,
			success: function (data) {
				show_loader(0);
				var showhidetanks = JSON.parse(storage.getItem('showhidetanks'));
				/*console.log(showhidetanks);*/
				var showtank = '';				
				var showdry = 0;				
				var showbore = -1;				
				$('#tank_mode').addClass('badge-primary').html('Auto');
				
				$('#tank_data').empty();
				
				$('#motorStatusDiv').hide();
				
				for(var k=0; k<data.length; k++){
					showtank = 'showtank_wms';
					//alert(data[k]);
					var tank_level = (data[k].level).replace('%','');
					var tank_number = parseInt(data[k].tank_number);
					var tank_mode = data[k].mode;
					var tank_dry = data[k].dryrun;
					var tank_cap = data[k].tankcap;
					
					if(tank_mode == 'M' || tank_mode == 'm'){
						$('#tank_mode').addClass('badge-danger').html('Manual');
					}					
					
					if(tank_dry != 'undefined' && tank_dry == 1){
						showdry++;
					}
					
					var TankCap = "";
					
					if(tank_cap != ""){
						TankCap = '<br/><div class="CapText">'+tank_cap+'</div>';
					}
										
					if(showhidetanks != null && showhidetanks.length > 0){
						if (showhidetanks.indexOf(tank_number) == -1){							
							showtank = '';
						}
					}

					if(data[k].hideAdmin == 1){
						showtank = '';
					}
					
					//For Motor Run Details
					if(k == 0 && ("motorRunDetails" in data[k])){
						
						$('#motorStatusDiv').show();
						
						//last_motor
						var motorDetails = data[k].motorRunDetails;
						$('#last_motor').html(motorDetails.last_motor);
						$('#last_motor_on').html(motorDetails.last_onned);
						$('#last_motor_off').html(motorDetails.last_offed);
						$('#cur_motor').html(motorDetails.running_motor);
						$('#cur_motor_on').html(motorDetails.current_started);
						$('#cur_motor_off').html('-');
					}
					
					if(k == 0 && ("reqReceived" in data[k])){
						$('#RequestDiv').hide();
						$('#RequestDiv').removeClass('blink');
						if(data[k].reqReceived[0] == 1){
							$('#RequestDiv').show();
							$('#RequestDiv').html('Data not received from - '+data[k].reqReceived[1]);
							$('#RequestDiv').addClass('blink');
						}
					}
					
					var motOn = data[k].motor;
					
					var motoron = "";
					
					//motOn = 1;
					
					if(motOn == 1){
						motoron = '<br/><img class="MotorOn" src="img/motorrun.png" />';
					}					
					
					$('#tank_data').append('<div class="col-4 col-sm-4 hide_tanks '+showtank+'"><div class="tank_design level'+tank_level+'"><span class="text-'+tank_level+'">'+data[k].level+'</span></div><div class="tank-name"><h2>'+data[k].name+TankCap+motoron+'</h2></div></div>');
					
					/*if(motOn == 1 && tank_number == 1){
						showbore++;
					}*/					
				}
				
				if(showbore > 0){
					$('#tank_data').append('<div class="col-4 col-sm-4"><img class="boreRun" src="img/borerun.png" /><div class="tank-name"><h2>Bore ON</h2></div></div>');
				}else if(showbore == 0){
					$('#tank_data').append('<div class="col-4 col-sm-4"><img class="boreRun" src="img/borerun.png" /><div class="tank-name"><h2>Bore OFF</h2></div></div>');					
				}					
				
				if(showdry > 0){
					$('#tank_dry').show();
					$('#tank_dry').addClass('blink');
				}else{
					$('#tank_dry').hide();
					$('#tank_dry').removeClass('blink');					
				}
			}
		});
	}
	
//Show/Hide Loader	
function show_loader(loader_wms){
	if(loader_wms == 0){
		$('#tank_body_section').show();
		$('.loader_div').hide();
	}	
}	

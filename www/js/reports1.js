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

$('#reportSearch').on('click',function(){
	get_tank_report('');
});

$('#GetReport').on('click',function(){
	get_tank_report('1');
});
  
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
    function get_tank_report(downL) {
		var company_ID = "VELAL";
		var FormData = $('#reportForm').serialize();
		$('#downLoad').val("");
		if(downL != ""){
			$('#downLoad').val(1);
			$('#reportForm').attr('action',config_url + "exportNew1.php");
			$('#reportForm').submit();
			return false;
		}
        $.ajax({
            async: true,
            type: "GET",
			crossOrigin: true,
            dataType: "JSON",
			data:FormData,
			url: config_url + "exportNew1_bed.php",
			success: function (data) {
				
				Object.size = function(obj) {
					var size = 0, key;
					for (key in obj) {
						if (obj.hasOwnProperty(key)) size++;
					}
					return size;
				};
				
				$('#bodyReport').empty();

				var Tdata = data.data;
				
				$('#TotRunning').html(data.TotData);
				
				if(Object.size(Tdata) > 0){
					
					var NameArr = [];
					NameArr[1] = 'Bore';
					NameArr[2] = 'Sump';
					
					for(var k=0; k<Tdata.length; k++){
						
						$('#bodyReport').append('<tr><td scope="row">'+Tdata[k][0]+'</td><td class="text-left">'+Tdata[k][1]+'</td><td class="text-left">'+Tdata[k][2]+'</td><td class="text-right">'+Tdata[k][3]+'</td></tr>');

					}					
					
				}						
				
			}
		});
	}
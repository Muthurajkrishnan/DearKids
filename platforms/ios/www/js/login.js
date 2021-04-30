 var storage = window.localStorage;

 if(storage.getItem('kustomUreLogyn'))
 {
	 window.location.href="dash.html";
 }else{
	 //$('.index_div').hide();
 } 

 tranformfromhome();

     function tranformfromhome() {

		setTimeout(function(){
			$('.index_to_home_page1').addClass('transform_img');
		}, 1)

		setTimeout(function(){
			$('.home_bg_div').removeClass('white-bg');
		}, 500)

	}

	$(document).on('click', '#logon', function () {
		var user = $('#user').val();
		var pass = $('#pass').val();
		$('#ErrorLogin').fadeOut();
			$('.ErrorInput').removeClass('ErrorInput');
			if (user != "" && pass != "") {
				LoginCustomer(user,pass);
			} 
			else {
				
				if (user == "") {
					$('#user').addClass('ErrorInput');
				} 
				
				if (pass == "") {
					$('#pass').addClass('ErrorInput');
				}
			}		
	});

	$(document).on('click', '.pass-show', function() {
		$(this).toggleClass("fa-eye fa-eye-slash");
		var dataatt = $(this).data("id")
		var input = $("#"+dataatt+"");
		if (input.attr("type") === "password") {
		  input.attr("type", "text");
		} else {
		  input.attr("type", "password");
		}
	  
	  });	

	$(document).on('click', '#logup', function () {
		var user = $('#dkuser').val();
		var pass = $('#dkpass').val();
		var strname = $('#stoRename').val();
		var contactno = $('#ConduCtNo').val();
		var gstno = $('#gstNu').val();
		var city = $('#ciTy').val();
		var state = $('#StaTeu').val();
		$('#ErrorLogin').fadeOut();
			$('.ErrorInput').removeClass('ErrorInput');
			if (user != "" && pass != "" && strname != "" && contactno != "" && gstno != "" && city != "" && state != "") {
				RegistCustomer(user,pass,strname,contactno,gstno,city,state);
			} 
			else {
				
				if (user == "") {
					$('#dkuser').addClass('ErrorInput');
				} 
				
				if (pass == "") {
					$('#dkpass').addClass('ErrorInput');
				}
				if (strname == "") {
					$('#stoRename').addClass('ErrorInput');
				}
				if (contactno == "") {
					$('#ConduCtNo').addClass('ErrorInput');
				}
				if (gstno == "") {
					$('#gstNu').addClass('ErrorInput');
				}
				if (city == "") {
					$('#ciTy').addClass('ErrorInput');
				}
				if (state == "") {
					$('#StaTeu').addClass('ErrorInput');
				}				
			}		
	});	
	
	
		function LoginCustomer(user,pass) {
			$('.index_div').show();
			$.ajax({
				type: "POST",
				dataType: "JSON",
				crossDomain: true,
				url: config_url + "/api/dkBakApi/LaaginCustomaaR",
				data: {EmaylId:user,passyWrd:pass},
				success: function (data) {
					if (data.success) {
						setTimeout(function(){ $('.index_div').hide(); }, 2000);
						storage.setItem('CustomeurId', data.data.id );
						storage.setItem('CostomerName', data.data.firstName );
						storage.setItem('kustomUreLogyn', true );
						window.location.href="successregister.html";
					}
					else if(data.success && data.expired){
						$('#ErrorLogin').html('Account Expired');
						$('#ErrorLogin').fadeIn('500');
					}else{
						$('.index_div').hide();
						$('#ErrorLogin').html('Invalid Credentials');
						$('#ErrorLogin').fadeIn('500');
					}
				}
			});		
	
		}	

		function RegistCustomer(user,pass,strname,contactno,gstno,city,state) {
			$('.index_div').show();
			$.ajax({
				type: "POST",
				dataType: "JSON",
				crossDomain: true,
				url: config_url + "/api/dkBakApi/reGisturCustomaaR",
				data: {emailId:user,password_fd:pass,firstName:strname,mobileNumber:contactno,gstno:gstno,addressCity:city,addressState:state},
				success: function (data) {
					if (data.success) {
						setTimeout(function(){ $('.index_div').hide(); }, 2000);
						storage.setItem('CustomeurId', data.data.id );
						storage.setItem('CostomerName', data.data.firstName );
						storage.setItem('kustomUreLogyn', true );
						window.location.href="successregister.html";
					}else{
						$('.index_div').hide();
						$('#ErrorRegister').html(data.message);
						$('#ErrorRegister').fadeIn('500');
					}
				}
			});		
	
		}		
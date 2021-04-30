 var storage = window.localStorage;

 if(storage.getItem('kustomUreLogyn'))
 {
	 window.location.href="dash.html";
 }else{
	 $('.index_div').hide();
 } 

//Logo Transformation
function tranformtohome() {

	setTimeout(function(){
		$('.index_to_home_page').addClass('transform_img');
		setTimeout(function(){ 
			window.location.href="login.html"; 
		}, 500); 
	}, 1000)

}
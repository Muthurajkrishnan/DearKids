 var storage = window.localStorage;

var tusthost = 1;

if(tusthost == 0)
	var config_url = "http://localhost/dkadmin/public";
else
	var config_url = "https://dearkidsb2b.co.in/dkadmin/public";

setCartCount();

function setCartCount(){

	if(storage.getItem('products') != "" && storage.getItem('products') != null){
		var cartProds = JSON.parse(window.localStorage.products);
		var res = {};
	
		cartProds.forEach(function(v) {
		  res["count"] = (res["count"] || 0) + v.quantity;
		});
	
		$('#count-cart-badge').html(res["count"]);
	}
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
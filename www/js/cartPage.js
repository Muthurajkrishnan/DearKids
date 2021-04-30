GetProductDetCart();

//Get Categories
function GetProductDetCart() {


	if(storage.getItem('products') == "" || storage.getItem('products') == null)
	{
		$('#cart_render_none').html('<div class="success-page"><h3>Cart is empty...</h3></div>');
	}

	var cartProds = window.localStorage.products;
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/buiiLdCkartpaaGe",
		data: {cartProdsFS:cartProds},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
				$('#cart_render').html(finalData);			
			}else{
				$('#cart_render_none').html('<div class="success-page"><h3>Cart is empty...</h3></div>');
			}
		}
	});		

}

function edit_prod(paGeiiD){
	storage.setItem('prodPage', paGeiiD);
	window.location.href="collection_ind.html"
}

function remove_prod(paGeiiD,sizeIdD){
	var cartProds = JSON.parse(window.localStorage.products);
	var newCart= cartProds.filter(function(item) {
		if (item.id == paGeiiD && item.size == sizeIdD)
			return false;
		else
			return true;
	  });
	storage.setItem('products', JSON.stringify(newCart));
	GetProductDetCart();
}
function clearKart(){
	storage.setItem('products', []);
	GetProductDetCart();
}

function send_enquiry_admin(){
	var cartProds = window.localStorage.products;
	$.ajax({
		type: "POST",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/buiiLdBooking",
		data: {cartProdsFS:cartProds, kaStweruid: storage.getItem('CustomeurId')},
		success: function (autput) {
			if (autput.success) {
					window.localStorage.products = [];
					window.location.href="successpagienqui.html";
			}else{
				//$('#cart_render_none').html('<div class="success-page"><h3>Cart is empty...</h3></div>');
			}
		}
	});	
}
GetProductDet();

//Get Categories
function GetProductDet() {

	var current_cate = storage.getItem('prodPage');

	if(storage.getItem('prodPage') == "" || storage.getItem('prodPage') == null)
	{
		window.location.href="dash.html";
	}

	if(storage.getItem('catePageNav') != "" && storage.getItem('catePageNav') != undefined){
		storage.setItem('catePage', storage.getItem('catePageNav'));
		storage.removeItem('catePageNav');		
	}
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/proDDEtaylz",
		data: {ProDuctiyd:current_cate},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
				if(finalData.length == 1){
					$("#prd_name").html(finalData[0].productName);
					$("#prd_cost").html("Rs."+finalData[0].productCost);
					$("#prd_desc").html(finalData[0].productNote);
					var prodImgesList = "";
					var allProdimges = finalData[0].productImages;
					var prodImges = [];
					if( allProdimges != null)
					 prodImges = JSON.parse(finalData[0].productImages);

					prodImges.unshift(finalData[0].attachmentsNeed);

					if(prodImges.length >0){
						
						for(let k=0; k<prodImges.length; k++) {
							var rpodimg = prodImges[k];
							var prod_img = "img/dkbg.png";
							if (rpodimg != null && rpodimg != ""){
								prod_img = config_url+'/storage/'+rpodimg;
							}							
							$('<div class="carousel-item prodSlideImg"><div class="zoom"><img onClick="zoomImage(\''+prod_img+'\')" class="align-middle" src="'+prod_img+'" alt="'+finalData[0].productName+'"></div></div>').appendTo('.carousel-inner');
							$('<li data-target="#prodImgSlider" data-slide-to="'+k+'"></li>').appendTo('.carousel-indicators');
					
						}
					
						$('.carousel-item').first().addClass('active');
						$('.carousel-indicators > li').first().addClass('active');
						$('#prodImgSlider').carousel();						
					}

					var productSizes = finalData[0].productSizes;
					var productPrizes = finalData[0].productPrizes;

					if( productSizes != null && productSizes != '[]')
						$('#sizes_box').html("");
						for (const [key, value] of Object.entries(productSizes)) {
							$('#sizes_box').append('<label class="checkbox-inline"><input type="radio" name="prodsize" data-valwep="'+productSizes[key]+'" data-valwe="'+value+'" onclick="setSizeCart(this)" value="'+key+'">'+value+'</label>');
						}

					
					$('#add_to-cart').attr("data-id", finalData[0].id);
					$('#add_to-cart').attr("data-name", finalData[0].productName);
					$('#add_to-cart').attr("data-summary", finalData[0].productNote);
					$('#add_to-cart').attr("data-price", finalData[0].productCost);
					$('#add_to-cart').attr("data-image", config_url+'/storage/'+finalData[0].attachmentsNeed);
				}			
			}else{
				$('.product-page-div').html('<div class="success-page"><h3>Product Not available</h3></div>')
			}
		}
	});		

}


function notifyproduct(dataT) {
	$.ajax({
		type: "POST",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/nityFiProd",
		data: {notiProf:storage.getItem('prodPage'), kaStweruid: storage.getItem('CustomeurId'), notiRating:dataT},
		success: function (autput) {
			if (autput.success) {
				$('#addedKart').modal();
			}else{
				$('#addedKart1').modal();
			}
		}
	});
}

var kzoom = 0;
function zoomImage(src){
	kzoom++;
	$('body').addClass('zoom-open');
	$('#imageZoomee').removeClass('d-none'); 
	$("#zoomIngf").attr("src",src);
}

function zoomsecond(){
	kzoom++;
	if(kzoom == 2){
		$('#zoomIngf').addClass('secZoom');
	}else{
		kzoom = 0;
		removeModal();
	}
}

function removeModal(){
	$('body').removeClass('zoom-open'); 
	$('#imageZoomee').addClass('d-none');
	$('#zoomIngf').removeClass('secZoom'); 
}
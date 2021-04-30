$(function () {

    $('.add2cart').myCart({
      classCartIcon: 'my-cart-icon',
      classCartBadge: 'my-cart-badge',
      classProductQuantity: 'my-product-quantity',
      classProductRemove: 'my-product-remove',
      classCheckoutCart: 'my-cart-checkout',
      affixCartIcon: true,
	  showCheckoutModal: true,
	  currencySymbol: '&#8377;',
      clickOnAddToCart: function($addTocart){
		$('#addedKart').modal();
      },
      clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
        //console.log("cart icon clicked", products, totalPrice, totalQuantity);
      },
	});
	
	$('#addedKart').on('hidden.bs.modal', function (e) {
		window.location.reload();
	});	

  });

  $(function () {

	$(".tb").hover(function () {

		$(".tb").removeClass("tb-active");
		$(this).addClass("tb-active");

		current_fs = $(".active");

		next_fs = $(this).attr('id');
		next_fs = "#" + next_fs + "1";

		$("fieldset").removeClass("active");
		$(next_fs).addClass("active");

		current_fs.animate({}, {
			step: function () {
				current_fs.css({
					'display': 'none',
					'position': 'relative'
				});
				next_fs.css({
					'display': 'block'
				});
			}
		});
	});

	$('.count').prop('disabled', true);
	$(document).on('click', '.plus', function () {
		$('.count').val(parseInt($('.count').val()) + 1);
		$('#add_to-cart').attr("data-quantity", parseInt($('.count').val()))
	});
	$(document).on('click', '.minus', function () {
		$('.count').val(parseInt($('.count').val()) - 1);
		if ($('.count').val() == 0) {
			$('.count').val(1);
		}

		$('#add_to-cart').attr("data-quantity", parseInt($('.count').val()))
	});

});

GetProductDet();

//Get Categories
function GetProductDet() {

	var current_cate = storage.getItem('prodPage');

	if(storage.getItem('prodPage') == "" || storage.getItem('prodPage') == null)
	{
		window.location.href="dash.html";
	}

	//storage.removeItem('prodPage');

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
							$('#sizes_box').append('<label class="checkbox-inline"><input type="radio" name="prodsize" data-valwep="'+productPrizes[key]+'" data-valwe="'+value+'" onclick="setSizeCart(this)" value="'+key+'">'+value+'</label>');
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

function setSizeCart(dataT) {

	if ($(dataT).is(':checked')) {
		$('#add_to-cart').attr("data-size", $(dataT).val());
		$("#prd_cost").html("Rs."+$(dataT).data('valwep'));
		$('#add_to-cart').attr("data-sizename", $(dataT).data('valwe'));
		$('#add_to-cart').attr("data-price", $(dataT).data('valwep'));
		$('#add_to-cart').prop("disabled", false);
	}
}

function addToKart(status,datat,dataw) {
	//console.log(status,datat,dataw);
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
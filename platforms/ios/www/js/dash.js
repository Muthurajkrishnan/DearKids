GetCategories();
getSliders();

//Get Categories
function GetCategories() {
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/proDCateKories",
		data: {},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
				for(var k=0; k<finalData.length; k++){
					var catIcon = finalData[k].categoryImage;
					var cat_img_icon = "img/dkbg.png";
					if (catIcon != null && catIcon != ""){
						cat_img_icon = config_url+'/storage/'+catIcon;
					}
					//$('#category_render').append('<div class="inner-child-div"><img src="'+config_url+'/storage/'+finalData[k].categoryImage+'" alt="Snow" style="width:100%;"><h3><a href="javascript:;" onClick="sETcatepAge('+finalData[k].id+')">'+finalData[k].categoryName+'</a></h3></div>');
					//$('#category_render').append('<div onClick="sETcatepAge('+finalData[k].id+')" class="cate-container" style="background:url('+cat_img_icon+')"><div class="brand-div"><h3>'+finalData[k].categoryName+'</h3></div></div>');
					$('#category_render').append('<div onClick="sETcatepAge('+finalData[k].id+')" class="cate-container" style="background:url('+cat_img_icon+')"></div><h3 class="cate-title">'+finalData[k].categoryName+'</h3>');
				}				
			}else{
				$('#category_render').append('<div class="inner-child-div"><h3 class="text-danger"><small>Categories not available</small></h3></div>');
			}
		}
	});		

}


function getSliders(){

	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/getDasSlider",
		data: {},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
						
				for(let k=0; k<finalData.length; k++) {
					var rpodimg = finalData[k].sliderImage;
					if(rpodimg != null){
						$('<div class="carousel-item"><div class=""><a href="javascript:;" style="display: block;" onClick="sETcatepAge('+finalData[k].category+')"><img class="banimg w-100" onerror="this.onerror=null; this.src=\'img/logomain.png\'" src="'+config_url+'/storage/'+rpodimg+'" alt="'+finalData[k].slider_name+'"></a></div></div>').appendTo('.carousel-inner');
						$('<li data-target="#carouselDashBanners" data-slide-to="'+k+'"></li>').appendTo('.carousel-indicators');
					}
			
				}
			
				$('.carousel-item').first().addClass('active');
				$('.carousel-indicators > li').first().addClass('active');
				$('#carouselDashBanners').carousel();						
			
			}else{
				$('.product-page-div').html('<div class="success-page"><h3>Product Not available</h3></div>')
			}
		}
	});	

}

function sETcatepAge(paGeiiD){
	storage.setItem('catePage', paGeiiD);
	window.location.href="collectionz.html"
}


$(document).ready(function(){
	$("#searchField").keyup(function(){
		$.ajax({
			type: "GET",
			dataType: "JSON",
			crossDomain: true,
			url: config_url + "/api/dkBakApi/getSearghResults",
			data:{searchStryng:$(this).val()},
			beforeSend: function(){
				$("#searchField").css("background","#FFF url(img/loader.gif) no-repeat 99%");
			},
			success: function(putput){
				if (putput.success) {
					$("#resulten-box").show();
					$("#resulten-box").html(putput.data);
					$("#searchField").css("background","#FFF");
				}else{
					$("#resulten-box").hide();
					$("#resulten-box").html("");
					$("#searchField").css("background","#FFF");					
				}
			}
		});
	});
});
//To select country name
function selectResult(val, pageType, pugRSt, showval) {
$("#searchField").val(showval);
$("#resulten-box").hide();

if(pageType == 1)
	sETcatepAge(val);
else
	sETProdAge(val, pugRSt);

}

function sETProdAge(paGeiiD, pugRSt){
	storage.setItem('prodPage', paGeiiD);
	if(pugRSt == 1)
	window.location.href="collection_ind.html";
	else
	window.location.href="collection_noti.html";
}

//Get Categories
function searchValue(rt) {
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/proDCateKories",
		data: {},
		success: function (autput) {
			if (autput.success) {
				var finalData = autput.data;
				for(var k=0; k<finalData.length; k++){
					var catIcon = finalData[k].categoryImage;
					var cat_img_icon = "img/dkbg.png";
					if (catIcon != null && catIcon != ""){
						cat_img_icon = config_url+'/storage/'+catIcon;
					}
					//$('#category_render').append('<div class="inner-child-div"><img src="'+config_url+'/storage/'+finalData[k].categoryImage+'" alt="Snow" style="width:100%;"><h3><a href="javascript:;" onClick="sETcatepAge('+finalData[k].id+')">'+finalData[k].categoryName+'</a></h3></div>');
					$('#category_render').append('<div onClick="sETcatepAge('+finalData[k].id+')" class="cate-container" style="background:url('+cat_img_icon+')"><div class="brand-div"><h3>'+finalData[k].categoryName+'</h3></div></div>');
				}				
			}else{
				$('#category_render').append('<div class="inner-child-div"><h3 class="text-danger"><small>Categories not available</small></h3></div>');
			}
		}
	});		

} 
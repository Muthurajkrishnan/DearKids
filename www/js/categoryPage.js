GetCategoryProducts();

//Get Categories
function GetCategoryProducts() {

	var current_cate = storage.getItem('catePage');

	storage.setItem('catePageNav', current_cate);

	if(storage.getItem('catePage') == "" || storage.getItem('catePage') == null)
	{
		window.location.href="dash.html";
	}	

	//storage.removeItem('catePage');
			
	$.ajax({
		type: "GET",
		dataType: "JSON",
		crossDomain: true,
		url: config_url + "/api/dkBakApi/proDfrMCategorys",
		data: {ProDuctModel:current_cate},
		success: function (autput) {
			if (autput.success && !autput.extra) {				
				var finalData = autput.data;
				for(var k=0; k<finalData.length; k++){
					var catIcon1 = finalData[k].attachmentsNeed;
					var cat_img_icon1 = "img/dkbg.png";
					if (catIcon1 != null && catIcon1 != ""){
						cat_img_icon1 = config_url+'/storage/'+catIcon1;
					}					
					$('#prod-colletionZZ').append('<div class="par-image-div col-sm-6 col-6"><div class="cate-image-div"><a href="javascript:;" onClick="sETProdAge('+finalData[k].id+','+finalData[k].activeStatus+')"><img src="'+cat_img_icon1+'" /></a></div></div>');
				}				
			}else if (autput.success && autput.extra){
				var finalData = autput.data;
				for(var k=0; k<finalData.length; k++){
					var catIcon = finalData[k].categoryImage;
					var cat_img_icon = "img/dkbg.png";
					if (catIcon != null && catIcon != ""){
						cat_img_icon = config_url+'/storage/'+catIcon;
					}
					$('#prod-colletionZZ').append('<div class="sub-cate-img-div col-sm-6 col-6"><div onClick="sETcatepAge('+finalData[k].id+')" class="cate-container" style="background:url('+cat_img_icon+')"><div class="sub-brand-div"><div class="cate-name">'+finalData[k].categoryName+'</div><button class="badge badge-sm badge-info cate-buy">BOOK NOW</button></div></div></div>');
				}				
			}else{
				$('#prod-colletionZZ').append('<div class="success-page"><h3>Products Not available</h3></div>');
			}
		}
	});		

}

function sETProdAge(paGeiiD, pugRSt){
	storage.setItem('prodPage', paGeiiD);
	if(pugRSt == 1)
	window.location.href="collection_ind.html";
	else
	window.location.href="collection_noti.html";
}

function sETcatepAge(paGeiiD){
	storage.setItem('catePage', paGeiiD);
	window.location.href="collectionz.html"
}
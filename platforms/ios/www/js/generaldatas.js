if(storage.getItem('CompanyID') != "undefined" &&  storage.getItem('CompanyID') != null)
{
	window.location.href="login.html";
}else{
	$('.index_div').hide();
}
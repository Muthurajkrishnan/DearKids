var storage = window.localStorage;

if(storage.getItem('kustomUreLogyn') == "" || storage.getItem('kustomUreLogyn') == null)
{
	storage.removeItem('CustomeurId');
	storage.removeItem('CostomerName');
	storage.removeItem('kustomUreLogyn');
	storage.setItem('products', []);	
	window.location.href="index.html";
}else{
	$('#usaaruName').html("("+storage.getItem('CostomerName')+")");
}

$(document).on('click', '#LaaguOut', function () {
	storage.removeItem('CustomeurId');
	storage.removeItem('CostomerName');
	storage.removeItem('kustomUreLogyn');
	storage.setItem('products', []);
    window.location.href = "index.html";
});
/**
 * @func makeApiCall()
 * @page flickr_search.ejs
 * 
 * @todo This method will issue an asynchronous, AJAX call to Flickr API
 *
 * @param 
 */
function makeApiCall() {
    
    var api_key = '24d47f894a2d8ff0b504cc1ee6aa0d13'; //Flickr
    
    $(document).ready(function() {
        var url ='https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + api_key + '&tags=' + $("#search").val() + '&per_page=' + $("#per_page").val() + '&format=json&nojsoncallback=1'; //Place your Flickr API Call Here
        $.ajax({url:url, dataType:"json"}).then(function(data) {
	    $.each(data.photos.photo, function(i, gp) {
		var farmId = gp.farm;
		var serverId = gp.server;
		var id = gp.id;
		var secret = gp.secret;

		console.log(farmId + ", " + serverId + ", " + id + ", " + secret);
	    });
        });
    });
}

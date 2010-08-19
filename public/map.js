var geoPlugin = function(geoplugin) {
  var latlng = new google.maps.LatLng(geoplugin.geoplugin_latitude, geoplugin.geoplugin_longitude);
  var options = {zoom: 4, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP};
  new google.maps.Map($("map-widget"), options);
}

var mapsCallback = function() {
  Widget.require('http://www.geoplugin.net/json.gp?ip=86.34.204.8', {type: 'text/javascript'});
}

Widget.require('http://maps.google.com/maps/api/js?sensor=false&callback=mapsCallback', {type: 'text/javascript'});
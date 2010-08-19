var geoPlugin = function(geoInfo) {
  var latlng = new google.maps.LatLng(geoInfo.geoplugin_latitude, geoInfo.geoplugin_longitude);
  var myOptions = {
    zoom: 4,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

var mapLoaded = function() {
  Widget.require('http://www.geoplugin.net/json.gp?ip=86.34.204.8', {type: 'text/javascript'})
}

Widget.require('http://maps.google.com/maps/api/js?sensor=false&callback=mapLoaded', {type: 'text/javascript'});
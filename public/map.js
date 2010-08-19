var geoPlugin = function(geoInfo) {
  var latlng = new google.maps.LatLng(geoInfo.geoplugin_latitude, geoInfo.geoplugin_longitude);
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

var mapLoaded = function() {
  Widget.require('http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx', {type: 'text/javascript'})
}

Widget.require('http://maps.google.com/maps/api/js?sensor=false&callback=mapLoaded', {type: 'text/javascript'});
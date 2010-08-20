window.Urban = window.Urban || {};

Urban.Map = Class.create({
  initialize: function(element) {
    window.geoPlugin = function(geoplugin) {
      var latlng = new google.maps.LatLng(geoplugin.geoplugin_latitude, geoplugin.geoplugin_longitude);
      var options = {zoom: 6, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP};
      new google.maps.Map(element, options);
    };

    window.mapsLoaded = function() {
      Urban.Ticket.load(function(ticket) {
        loadScript('http://www.geoplugin.net/json.gp?ip=' + ticket.getServerParameters().getIp());
      });
    };
    
    loadScript('http://maps.google.com/maps/api/js?sensor=false&callback=mapsLoaded');
  }
});
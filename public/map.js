window.Urban = window.Urban || {};

Urban.Map = Class.create({
  initialize: function(element) {
    this.element = element;
    
    window.geoPlugin = this.geoPlugin.bind(this);
    window.mapsLoaded = this.mapsLoaded.bind(this);
    loadScript('http://maps.google.com/maps/api/js?sensor=false&callback=mapsLoaded');
  },
  
  geoPlugin: function(geoplugin) {
    new Urban.Map.View(this.element, geoplugin);
  },
  
  mapsLoaded: function() {
    Urban.Ticket.load(function(ticket) {
      loadScript('http://www.geoplugin.net/json.gp?ip=' + ticket.getServerParameters().getIp());
    });
  }
});

Urban.Map.View = Class.create({
  initialize: function(element, geoplugin) {
    var latLng = new google.maps.LatLng(geoplugin.geoplugin_latitude, geoplugin.geoplugin_longitude);
    new google.maps.Map(element, {zoom: 6, center: latLng, mapTypeId: google.maps.MapTypeId.ROADMAP});
  }
});
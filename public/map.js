window.Urban = window.Urban || {};

Urban.Map = Class.create({
  initialize: function(element) {
    this.element = element;
    
    window.geoPlugin = this.geodataLoaded.bind(this);
    window.mapsLoaded = this.mapsLoaded.bind(this);
    loadScript(Urban.Map.MAPS_URL);
  },
  
  mapsLoaded: function() {
    Urban.Ticket.load(this.ticketLoaded.bind(this));
  },

  ticketLoaded: function(ticket) {
    var serverParameters = ticket.getServerParameters();
    if (!serverParameters || !serverParameters.getIp()) {
      this.element.up(".widget").hide();
      return;
    }
    
    loadScript(Urban.Map.GEOPLUGIN_URL + serverParameters.getIp());
  },
  
  geodataLoaded: function(geodata) {
    var latLng = new google.maps.LatLng(geodata.geoplugin_latitude, geodata.geoplugin_longitude);
    new google.maps.Map(this.element, {zoom: 6, center: latLng, mapTypeId: google.maps.MapTypeId.ROADMAP});
  }
});

Urban.Map.MAPS_URL = 'http://maps.google.com/maps/api/js?sensor=false&callback=mapsLoaded';
Urban.Map.GEOPLUGIN_URL = 'http://www.geoplugin.net/json.gp?ip=';
window.Urban = window.Urban || {};

Urban.Map = Class.create({
  initialize: function(element) {
    this.element = element;
    
    window.geoPlugin = this.geodataLoaded.bind(this);
    window.mapsLoaded = this.mapsLoaded.bind(this);
    loadScript('http://maps.google.com/maps/api/js?sensor=false&callback=mapsLoaded');
  },
  
  mapsLoaded: function() {
    Urban.Ticket.load(this.ticketLoaded.bind(this));
  },

  ticketLoaded: function(ticket) {
    loadScript('http://www.geoplugin.net/json.gp?ip=' + ticket.getServerParameters().getIp());
  },
  
  geodataLoaded: function(geodata) {
    new Urban.Map.View(this.element, geodata);
  }
});

Urban.Map.View = Class.create({
  initialize: function(element, geodata) {
    var latLng = new google.maps.LatLng(geodata.geoplugin_latitude, geodata.geoplugin_longitude);
    new google.maps.Map(element, {zoom: 6, center: latLng, mapTypeId: google.maps.MapTypeId.ROADMAP});
  }
});
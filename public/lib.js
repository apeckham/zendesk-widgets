window.Urban = window.Urban || {};

Urban.Admin = Class.create({
  initialize: function(element) {
    this.view = new Urban.Admin.View(element);
    
    Urban.Ticket.load(function(ticket) {
      this.view.render(ticket.getMatches());
    }.bind(this));
  }
});

Urban.Admin.View = Class.create({
  initialize: function(element) {
    this.element = element;
  },

  render: function(matches) {
    matches = $A(matches).collect(function(match) {
      html = "<a href=\"http://www.urbandictionary.com/appadmin/?field=";
      
      if (match.type == "defid") {
        return html + "defid&search=" + match.string + "\">" + match.string + "</a>";
      } else {
        return html + "term&search=" + encodeURIComponent(match.string) + "\">" + match.string + "</a>";
      }
    });

    var ul = new Element("ul");
    $A(matches).each(function(match) {
      var li = new Element("li");
      li.innerHTML = match;
      ul.appendChild(li)
    });

    this.element.update(ul);
  }
});

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

function loadScript(src) {
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
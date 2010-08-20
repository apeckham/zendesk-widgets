var Urban = {};

Urban.Ticket = Class.create({
  initialize: function(json) {
    this.json = json;
  },

  getMatches: function() {
    var description = this.json.description.split("------------------")[0];
    var matches = [];

    function addMatches(pattern, type) {
      while (match = pattern.exec(description)) {
        matches.push({string: match[1], type: type});
      }
    }

    addMatches(/defid=(\d+)/g, "defid");
    addMatches(/"([^"]{0,30})"/g, "quoted");
    addMatches(/'([^']{0,30})'/g, "quoted");

    return matches;
  }
});

Urban.View = Class.create({
  initialize: function(element) {
    this.element = element || $("admin-element");
  },

  render: function(matches) {
    matches = $A(matches).collect(function(match) {
      if (match.type == "defid") {
        return "<a href=\"http://www.urbandictionary.com/appadmin/?field=defid&search=" + match.string + "\">" + match.string + "</a>";
      } else {
        return "<a href=\"http://www.urbandictionary.com/appadmin/?field=term&search=" + encodeURIComponent(match.string) + "\">" + match.string + "</a>";
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

Urban.Admin = Class.create({
  initialize: function(element) {
    this.view = new Urban.View(element);
    
    var href = window.location.href.replace(/\?.+/, "") + ".json";
    new Ajax.Request(href, {method: "GET", onSuccess: this.success.bind(this)});
  },

  success: function(transport) {
    var ticket = new Urban.Ticket(transport.responseJSON);
    this.view.render(ticket.getMatches());
  }
});

Urban.Map = Class.create({
  initialize: function(element) {
    window.geoPlugin = function(geoplugin) {
      var latlng = new google.maps.LatLng(geoplugin.geoplugin_latitude, geoplugin.geoplugin_longitude);
      var options = {zoom: 4, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP};
      new google.maps.Map(element, options);
    };

    window.mapsCallback = function() {
      var script = document.createElement('script');
      script.src = 'http://www.geoplugin.net/json.gp?ip=86.34.204.8';
      document.body.appendChild(script);
    };
    
    var script = document.createElement('script');
    script.src = 'http://maps.google.com/maps/api/js?sensor=false&callback=mapsCallback';
    document.body.appendChild(script);
  }
});
var Urban = {};

Urban.Ticket = Class.create({
  initialize: function(json) {
    this.json = json;
  },

  getMatches: function() {
    var description = this.json.description.split("------------------")[0];
    var matches = [];

    function addMatches(pattern, type, callback) {
      while (match = pattern.exec(description)) {
        matches.push({string: (callback || Prototype.K)(match[1]), type: type});
      }
    }

    addMatches(/defid=(\d+)/g, "defid");
    addMatches(/"([^"]{0,50})"/g, "term");
    addMatches(/'([^']{0,50})'/g, "term");
    addMatches(/term=([\w%\+]+)/g, "term", function(string) {
      return decodeURIComponent(string.replace(/\+/g, " "));
    });

    return matches;
  },
  
  getServerParameters: function() {
    var serverJson = this.json.description.match(/------------------\s+Submitted from: (\{.+\})/)[1];
    return new Urban.Ticket.ServerParameters(JSON.parse(serverJson));
  }
});

Urban.Ticket.ServerParameters = Class.create({
  initialize: function(json) {
    this.json = json;
  },
  
  get: function(key) {
    return this.json[key];
  },
  
  getIp: function() {
    return this.json["HTTP_X_FORWARDED_FOR"].split(", ")[0];
  }
});

Urban.Ticket.load = function(callback) {
  var href = window.location.href.replace(/\?.+/, "") + ".json";
  
  new Ajax.Request(href, {method: "GET", onSuccess: function(transport) {
    var ticket = new Urban.Ticket(transport.responseJSON);
    callback(ticket);
  }});
};

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
window.Urban = window.Urban || {};

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
    var matches = this.json.description.match(/------------------\s+Submitted from: (\{.+\})/);
    if (!matches) {
      return null;
    }
    var serverJson = matches[1];
    
    var parsed;
    try {
      parsed = JSON.parse(serverJson);
    } catch (e) {
      return null;
    }
    
    return new Urban.Ticket.ServerParameters(parsed);
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
    field = this.json["HTTP_X_FORWARDED_FOR"];
    if (!field) {
      return null;
    }
    return field.split(", ")[0];
  }
});

Urban.Ticket.load = function(callback) {
  var href = window.location.href.replace(/\?.+/, "") + ".json";
  
  new Ajax.Request(href, {method: "GET", onSuccess: function(transport) {
    var ticket = new Urban.Ticket(transport.responseJSON);
    callback(ticket);
  }});
};

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
    if (matches.length == 0) {
      this.element.up(".widget").hide();
      return;
    }
    
    matches = $A(matches).collect(function(match) {
      var template = new Template("#{field} <a href=\"http://www.urbandictionary.com/https://secure.urbandictionary.com/appadmin//?field=#{field}&search=#{search}\" target=\"urbandictionary_https://secure.urbandictionary.com/appadmin/\">#{text}</a>");
      
      if (match.type == "defid") {
        return template.evaluate({field: "defid", search: match.string, text: match.string});
      } else if (match.type == "author") {
        return template.evaluate({field: "author", search: encodeURIComponent(match.string), text: match.string});
      } else {
        return template.evaluate({field: "term", search: encodeURIComponent(match.string), text: match.string});
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
    
    function clean(string) {
      return decodeURIComponent(string.replace(/\+/g, " "));
    }

    addMatches(/defid=(\d+)/g, "defid");
    addMatches(/"([^"]{0,50})"/g, "term");
    addMatches(/'([^']{0,50})'/g, "term");
    addMatches(/term=([\w%\+]+)/g, "term", clean);
    addMatches(/author=([\w%\+]+)/g, "author", clean);

    return matches;
  },
  
  getServerParameters: function() {
    var matches = this.json.description.match(/------------------\s+Submitted from: (\{.+\})/);
    if (!matches) {
      return null;
    }

    var parsed;
    try {
      parsed = JSON.parse(matches[1]);
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
  var href = "/tickets/" + window.ticket_id + ".json";
  
  new Ajax.Request(href, {method: "GET", onSuccess: function(transport) {
    var ticket = new Urban.Ticket(transport.responseJSON);
    callback(ticket);
  }});
};
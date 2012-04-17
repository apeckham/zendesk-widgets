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
      var template = new Template("#{field} <a href=\"https://secure.urbandictionary.com/appadmin/?field=#{field}&search=#{search}\" target=\"urbandictionary_https://secure.urbandictionary.com/appadmin/\">#{text}</a>");
      
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
    var matches = [];
    
    function matchString(string) {
      function addMatches(pattern, type, callback) {
        while (match = pattern.exec(string)) {
          var firstMatch = match[1].replace(/\n/g, " ");
          var newHash = {string: (callback || Prototype.K)(firstMatch), type: type};

          var alreadyFound = matches.find(function(found) {
            return found.string.toLowerCase() == newHash.string.toLowerCase() && found.type == newHash.type;
          });

          if (!alreadyFound) {
            matches.push(newHash);
          }
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
    }
    
    var description = this.json.description.split("------------------")[0];
    matchString(description);
    
    $A(this.json.comments).each(function(comment) {
      matchString(comment.value);
    });

    return $A(matches).uniq();
  }
});

Urban.Ticket.load = function(callback) {
  var href = "/tickets/" + window.ticket_id + ".json";
  
  new Ajax.Request(href, {method: "GET", onSuccess: function(transport) {
    var ticket = new Urban.Ticket(transport.responseJSON);
    callback(ticket);
  }});
};
var UrbanWidget = {
  Ticket: Class.create({
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
  }),

  View: Class.create({
    initialize: function(element) {
      this.element = element || $("my-widget");
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
  }),

  Request: Class.create({
    initialize: function() {
    },

    success: function(transport, element) {
      var view = new UrbanWidget.View(element);
      var ticket = new UrbanWidget.Ticket(transport.responseJSON);
      view.render(ticket.getMatches());
    },

    send: function(href) {
      href = href.replace(/\?.+/, "");
      href += ".json";
      
      new Ajax.Request(href, {method: "GET", onSuccess: this.success.bind(this)});
    }
  })
};

if (window.location.href.match(/ticket/)) {
  new UrbanWidget.Request().send(window.location.href);
}
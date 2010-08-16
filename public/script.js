var Ticket = Class.create({
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

var View = Class.create({
  initialize: function(element) {
    this.element = element;
  },
  
  render: function(matches) {
    matches = $A(matches).collect(function(match) {
      if (match.type == "defid") {
        return "<a href=\"http://www.urbandictionary.com/appadmin/?field=defid&search=" + match.string + "\">" + match.string + "</a>";
      } else {
        return match.string;
      }
    });
    
    this.element.update(matches.join(" "));
  }
});

var Request = Class.create({
  initialize: function() {
  },
  
  success: function(transport, element) {
    var view = new View(element || $("my-widget"));
    var ticket = new Ticket(transport.responseJSON);
    view.render(ticket.getMatches());
  },
  
  send: function(href) {
    new Ajax.Request(href + ".json", {
      method: "GET",
      onSuccess: function() {
        request.success.call(arguments)
      }
    });
  }
});

if (window.location.href.match(/ticket/)) {
  new Request().send(window.location.href);
}
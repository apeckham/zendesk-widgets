var Ticket = Class.create({
  initialize: function(json) {
    this.json = json;
  },
  
  getMatches: function() {
    var description = this.json.description;
    description = description.split("------------------")[0];

    var matches = [];

    function addMatches(pattern) {
      while (match = pattern.exec(description)) {
        matches.push(match[1]);
      }
    }

    addMatches(/defid=(\d+)/g);
    addMatches(/"([^"]{0,30})"/g);
    addMatches(/'([^']{0,30})'/g);
    
    return matches;
  }
});

var View = Class.create({
  initialize: function(element) {
    this.element = element;
  },
  
  render: function(matches) {
    this.element.update(matches.join(" "));
  }
});

var Controller = Class.create({
  initialize: function() {
  },
  
  success: function(transport, element) {
    var view = new View(element || $("my-widget"));
    var ticket = new Ticket(transport.responseJSON);
    view.render(ticket.getMatches());
  },
  
  fetch: function(href) {
    new Ajax.Request(href + ".json", {
      method: "GET",
      onSuccess: function() {
        controller.success.call(arguments)
      }
    });
  }
});

if (window.location.href.match(/ticket/)) {
  var controller = new Controller();
  controller.fetch(window.location.href);
}
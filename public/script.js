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

var success = function(transport, element) {
  element = element || $("my-widget");
  
  var ticket = new Ticket(transport.responseJSON);
  
  element.update(ticket.getMatches().join(" "));
};

if (window.location.href.match(/ticket/)) {
  new Ajax.Request(window.location.href + ".json", {
    method: "GET",
    onSuccess: success
  });
}
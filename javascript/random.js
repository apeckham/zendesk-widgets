window.Urban = window.Urban || {};

Urban.Random = Class.create({
  initialize: function(element) {
    var anchor = new Element("a");
    anchor.update("Random ticket");
    anchor.observe('click', this.clicked.bind(this));
    
    element.update(anchor);
  },
  
  clicked: function() {
    var page = Math.floor(Math.random() * 15);
    
    new Ajax.Request("/rules/1183626.js?page=" + page, {method: "GET", onSuccess: function(transport) {
      var tickets = JSON.parse(transport.responseText);
      var ticket = tickets[Math.floor(Math.random() * tickets.length)];
      window.location = "/tickets/" + ticket.nice_id;
    }});
  }
});
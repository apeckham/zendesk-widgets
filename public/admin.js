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

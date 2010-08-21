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
      var template = new Template("#{field} <a href=\"http://www.urbandictionary.com/appadmin/?field=#{field}&search=#{search}\" target=\"urbandictionary_appadmin\">#{text}</a>");
      
      if (match.type == "defid") {
        return template.evaluate({field: "defid", search: match.string, text: match.string});
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

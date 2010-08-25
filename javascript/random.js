window.Urban = window.Urban || {};

Urban.Random = Class.create({
  initialize: function(element) {
    var anchor = new Element("a");
    anchor.update("Random ticket");
    anchor.observe('click', this.clicked.bind(this));
    
    element.update(anchor);
  },
  
  clicked: function() {
    window.blah = 100;
  }
});
window.Urban = window.Urban || {};

Urban.Random = Class.create({
  initialize: function(element) {
    var anchor = new Element("a");
    anchor.update("Random ticket");
    
    element.update(anchor)
  }
});
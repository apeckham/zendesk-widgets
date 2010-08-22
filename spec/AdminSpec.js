describe("View", function() {
  var element;

  beforeEach(function() {
    $("jasmine_content").update("<div class='widget' id='widget'><div id='admin-element'></div></div>");
    element = $("admin-element");
  });

  it("should show some text if there were no defids", function() {
    new Urban.Admin.View(element).render([]);
    expect($("widget").visible()).toBeFalsy();
  });
  
  it("should link to appadmin", function() {
    new Urban.Admin.View(element).render([{string: "150125", type: "defid"}]);
    var anchors = element.select("a");
    expect(anchors.length).toEqual(1);
    expect(anchors[0].href).toEqual("http://www.urbandictionary.com/appadmin/?field=defid&search=150125");
  });
  
  it("should link to appadmin", function() {
    new Urban.Admin.View(element).render([{string: "a b", type: "term"}]);
    var anchors = element.select("a");
    expect(anchors.length).toEqual(1);
    expect(anchors[0].href).toEqual("http://www.urbandictionary.com/appadmin/?field=term&search=a%20b");
  });
  
  it("should link to appadmin", function() {
    new Urban.Admin.View(element).render([{string: "a b", type: "author"}]);
    var anchors = element.select("a");
    expect(anchors.length).toEqual(1);
    expect(anchors[0].href).toEqual("http://www.urbandictionary.com/appadmin/?field=author&search=a%20b");
  });
});
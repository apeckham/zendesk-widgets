describe("Random widget", function() {
  var element;

  beforeEach(function() {
    $("jasmine_content").update("<div class='widget' id='widget'><div id='random-element'></div></div>");
    element = $("random-element");
  });
  
  it("should show a random link", function() {
    new Urban.Random(element);
    expect(element.down("a")).toBeTruthy();
  });
  
  it("should do something when you click on the link", function() {
    new Urban.Random(element).clicked();
    expect(window.blah).toEqual(100);
  });
});
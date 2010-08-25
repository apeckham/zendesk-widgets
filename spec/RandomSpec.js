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
});
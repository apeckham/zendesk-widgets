describe("Maps", function() {
  it("loads", function() {
    spyOn(window, 'loadScript');
    
    var element = document.createElement('div');
    new Urban.Map(element);
    
    expect(window.loadScript).toHaveBeenCalled();
  });
});
describe("Ticket", function() {
  it("should extract defids", function() {
    ticket = new Ticket({description: "The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890"});
    expect(ticket.getMatches()).toEqual([{string: '5050890', type: 'defid'}, {string: 'Nerd', type: 'quoted'}]);
  });
  
  it("should extract quoted text", function() {
    ticket = new Ticket({description: "I own the trademark for \"kosher meet market\" and am therefore 'requesting' the items"});
    expect(ticket.getMatches()).toEqual([{string: 'kosher meet market', type: 'quoted'}, {string: 'requesting', type: 'quoted'}]);
  });
});

describe("Integration", function() {  
  it("integrates", function() {
    var element = new Element("div");
    
    ticket = {"description":"I own the trademark for \"kosher meet market\" and am therefore 'requesting'"};
    transport = {responseJSON: ticket};
    new Request().success(transport, element);
    
    expect(element.getInnerText()).toEqual("kosher meet market requesting");
  });
});

describe("View", function() {
  it("should show some text if there were no defids", function() {
    var element = new Element("div");
    new View(element).render([]);
    expect(element.getInnerText()).toEqual("");
  });
});
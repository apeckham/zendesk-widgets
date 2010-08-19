var element;

beforeEach(function() {
  element = new Element("div");
});

describe("Ticket", function() {
  it("should extract defids", function() {
    ticket = new Urban.Ticket({description: "The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890"});
    expect(ticket.getMatches()).toEqual([{string: '5050890', type: 'defid'}, {string: 'Nerd', type: 'quoted'}]);
  });
  
  it("should extract quoted text", function() {
    ticket = new Urban.Ticket({description: "I own the trademark for \"kosher meet market\" and am therefore 'requesting' the items"});
    expect(ticket.getMatches()).toEqual([{string: 'kosher meet market', type: 'quoted'}, {string: 'requesting', type: 'quoted'}]);
  });
});

describe("Integration", function() {  
  it("integrates", function() {
    ticket = {"description":"I own the trademark for \"kosher meet market\" and am therefore 'requesting'"};
    transport = {responseJSON: ticket};
    new Urban.Request().success(transport, element);
    
    expect(element.getInnerText()).toEqual("kosher meet marketrequesting");
  });
});

describe("View", function() {
  it("should show some text if there were no defids", function() {
    new Urban.View(element).render([]);
    expect(element.getInnerText()).toEqual("");
  });
  
  it("should link to appadmin", function() {
    new Urban.View(element).render([{string: "150125", type: "defid"}]);
    var anchors = element.select("a");
    expect(anchors.length).toEqual(1);
    expect(anchors[0].href).toEqual("http://www.urbandictionary.com/appadmin/?field=defid&search=150125");
  });
  
  it("should link to appadmin", function() {
    new Urban.View(element).render([{string: "a b", type: "quoted"}]);
    var anchors = element.select("a");
    expect(anchors.length).toEqual(1);
    expect(anchors[0].href).toEqual("http://www.urbandictionary.com/appadmin/?field=term&search=a%20b");
  });
});
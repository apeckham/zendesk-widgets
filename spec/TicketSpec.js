describe("Ticket", function() {
  it("should extract defids", function() {
    var ticket = new Urban.Ticket({description: "The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890"});
    expect(ticket.getMatches()).toEqual([{string: '5050890', type: 'defid'}, {string: 'Nerd', type: 'term'}]);
  });
  
  it("should extract term text", function() {
    var ticket = new Urban.Ticket({description: "I own the trademark for \"kosher meet market\" and am therefore 'requesting' the items"});
    expect(ticket.getMatches()).toEqual([{string: 'kosher meet market', type: 'term'}, {string: 'requesting', type: 'term'}]);
  });
  
  it("should extract terms", function() {
    var ticket = new Urban.Ticket({description: "The word is http://www.urbandictionary.com/define.php?term=Nerd%20bird+jetblue+plane)"});
    expect(ticket.getMatches()).toEqual([{string: 'Nerd bird jetblue plane', type: 'term'}]);
  });
  
  it("should extract terms and ignores duplicates", function() {
    var ticket = new Urban.Ticket({description: "The word is 'Nerd bird jetblue plane' and 'Nerd bird jetblue plane')"});
    expect(ticket.getMatches()).toEqual([{string: 'Nerd bird jetblue plane', type: 'term'}]);
  });
  
  it("should extract authors", function() {
    var ticket = new Urban.Ticket({description: "The word is http://www.urbandictionary.com/author.php?author=Nerd%20bird+jetblue+plane)"});
    expect(ticket.getMatches()).toEqual([{string: 'Nerd bird jetblue plane', type: 'author'}]);
  });
  
  it("extracts from comments too, and replaces newlines", function() {
    var ticket = new Urban.Ticket({description: "", comments: [{value: "nothing"}, {value: "definition for \"Dan\nXX\"\n\nJeff\n\n"}]});
    expect(ticket.getMatches()).toEqual([{string: "Dan XX", type: 'term'}]);
  });
});
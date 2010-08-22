describe("Ticket", function() {
  it("should extract defids", function() {
    var ticket = new Urban.Ticket({description: "The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890"});
    expect(ticket.getMatches()).toEqual([{string: '5050890', type: 'defid'}, {string: 'Nerd', type: 'term'}, {string: 'Nerd', type: 'term'}]);
  });
  
  it("should extract term text", function() {
    var ticket = new Urban.Ticket({description: "I own the trademark for \"kosher meet market\" and am therefore 'requesting' the items"});
    expect(ticket.getMatches()).toEqual([{string: 'kosher meet market', type: 'term'}, {string: 'requesting', type: 'term'}]);
  });
  
  it("should extract terms", function() {
    var ticket = new Urban.Ticket({description: "The word is http://www.urbandictionary.com/define.php?term=Nerd%20bird+jetblue+plane)"});
    expect(ticket.getMatches()).toEqual([{string: 'Nerd bird jetblue plane', type: 'term'}]);
  });
  
  it("should extract authors", function() {
    var ticket = new Urban.Ticket({description: "The word is http://www.urbandictionary.com/author.php?author=Nerd%20bird+jetblue+plane)"});
    expect(ticket.getMatches()).toEqual([{string: 'Nerd bird jetblue plane', type: 'author'}]);
  });
  
  it("should extract server parameters", function() {
    var ticket = new Urban.Ticket({"description":"Hello,Thanks,\nN\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.126 Safari/533.4\",\"REMOTE_ADDR\":\"208.122.31.10\",\"HTTP_REFERER\":null,\"HTTP_COOKIE\":\"__qca=P0-447681624-1282156495013; __gads=ID=cef860e362d010e2:T=1282156496:S=ALNI_MZnlOLsEPsLIMpNPUFSyXIqYN0WTg; __utmz=246446400.1282156669.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=emil%20mesaros; __utma=246446400.35929657.1282156669.1282156669.1282156669.1; __utmc=246446400; __utmb=246446400.1.10.1282156669; _urban_session=BAh7BzoPc2Vzc2lvbl9pZCIlZDAwMGI0OGQ4NDUxMzc2NGQ5OTk4YjYxZDc0MjYyYzY6EXZpZXdlZF9kZWZpZCIMMzE1MDg1Ng%3D%3D--e36a5b9417acd5ab9fef2a7cf434acdc3200e422\",\"HTTP_X_FORWARDED_FOR\":\"86.34.204.8, 208.122.31.29\"}"});
    expect(ticket.getServerParameters().get('HTTP_USER_AGENT')).toEqual("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.126 Safari/533.4");
  });
  
  it("should extract server parameters when missing", function() {
    var ticket = new Urban.Ticket({"description":"Hello,Thanks,"});
    expect(ticket.getServerParameters()).toBeNull();
  });
  
  it("should handle invalid JSON", function() {
    var ticket = new Urban.Ticket({"description":"Hello,Thanks,\nN\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT}"});
    expect(ticket.getServerParameters()).toBeNull();
  });

  describe("Server parameters", function() {
    it("should return the IP", function() {
      var serverParameters = new Urban.Ticket.ServerParameters({"REMOTE_ADDR": "208.122.31.10", "HTTP_X_FORWARDED_FOR": "86.34.204.8, 208.122.31.29"});
      expect(serverParameters.getIp()).toEqual("86.34.204.8");
    });
    
    it("should return null if there is no IP", function() {
      var serverParameters = new Urban.Ticket.ServerParameters({});
      expect(serverParameters.getIp()).toBeNull();
    });
  });
});
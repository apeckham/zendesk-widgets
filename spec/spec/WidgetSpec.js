describe("Widget", function() {
  it("should show the ticket subject", function() {
    var element = new Element("div");
    
    transport = {responseJSON: {subject: "Ticket subject"}};
    success(transport, element);
    
    expect(element.innerHTML).toEqual("Subject: Ticket subject");
  })
});
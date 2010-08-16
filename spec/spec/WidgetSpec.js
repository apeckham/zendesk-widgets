describe("Widget", function() {
  it("should show the defid of anything mentioned", function() {
    var element = new Element("div");
    
    ticket = {"description":"Dear Sir/Madam, my family friend has entered my son's FULL NAME incl. some details of his e.g. school etc. in the tags of a word. The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890.\n\nI would appreciate if you could remove that entry as soon as possible for privacy reasons etc. etc.\n\nThank you and a email response would be greatly appreciated to notify me whether or not the word is removed.\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8\",\"REMOTE_ADDR\":\"208.122.62.141\",\"HTTP_REFERER\":\"http://answers.yahoo.com/question/index?qid=20080618125044AAW1Zus\",\"HTTP_COOKIE\":\"__utma=246446400.258272569.1281774861.1281774861.1281869061.2; __utmz=246446400.1281869061.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=vignesh%20mathiyalagan; _urban_session=BAh7BzoPc2Vzc2lvbl9pZCIlNmY4MjdlZDk5ZjNlMTI5MDU1NGJmMTFjODc1MGRmNWY6EXZpZXdlZF9kZWZpZCIMMjkzNjMyMQ%3D%3D--b906a481623080a9d08b469971ca1e02f5cfa6df; __utmb=246446400.2.10.1281869061; __utmc=246446400\",\"HTTP_X_FORWARDED_FOR\":\"121.216.251.15, 208.122.62.133\"}"};
    transport = {responseJSON: ticket};
    success(transport, element);
    
    expect(element.innerHTML).toEqual("5050890");
  });
  
  it("should show some text if there were no defids", function() {
    var element = new Element("div");
    
    ticket = {"description":""};
    transport = {responseJSON: ticket};
    success(transport, element);
    
    expect(element.innerHTML).toEqual("no defids");
  })
});
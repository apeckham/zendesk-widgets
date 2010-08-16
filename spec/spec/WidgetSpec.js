describe("Widget", function() {
  var element;
  
  beforeEach(function() {
    element = new Element("div");
  });
  
  it("should show the defid of anything mentioned", function() {
    ticket = {"description":"Dear Sir/Madam, my family friend has entered my son's FULL NAME incl. some details of his e.g. school etc. in the tags of a word. The word is 'Nerd' - http://www.urbandictionary.com/define.php?term=Nerd&defid=5050890.\n\nI would appreciate if you could remove that entry as soon as possible for privacy reasons etc. etc.\n\nThank you and a email response would be greatly appreciated to notify me whether or not the word is removed.\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8\",\"REMOTE_ADDR\":\"208.122.62.141\",\"HTTP_REFERER\":\"http://answers.yahoo.com/question/index?qid=20080618125044AAW1Zus\",\"HTTP_COOKIE\":\"__utma=246446400.258272569.1281774861.1281774861.1281869061.2; __utmz=246446400.1281869061.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=vignesh%20mathiyalagan; _urban_session=BAh7BzoPc2Vzc2lvbl9pZCIlNmY4MjdlZDk5ZjNlMTI5MDU1NGJmMTFjODc1MGRmNWY6EXZpZXdlZF9kZWZpZCIMMjkzNjMyMQ%3D%3D--b906a481623080a9d08b469971ca1e02f5cfa6df; __utmb=246446400.2.10.1281869061; __utmc=246446400\",\"HTTP_X_FORWARDED_FOR\":\"121.216.251.15, 208.122.62.133\"}"};
    transport = {responseJSON: ticket};
    new Controller().success(transport, element);
    
    expect(element.innerHTML).toEqual("5050890 Nerd");
  });
  
  it("should show some text if there were no defids", function() {
    ticket = {"description":""};
    transport = {responseJSON: ticket};
    new Controller().success(transport, element);
    
    expect(element.innerHTML).toEqual("");
  });
  
  it("should link to anything that is quoted", function() {
    var element = new Element("div");
    
    ticket = {"description":"I own the trademark for \"kosher meet market\" and am therefore 'requesting' the items featuring this name be removed from this page.\r\n\r\n------------------\r\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729)\",\"REMOTE_ADDR\":\"208.122.62.141\",\"HTTP_REFERER\":\"http://www.urbandictionary.com/products.php?defid=2398224\",\"HTTP_COOKIE\":\"country=US; _urban_session=BAh7CDoPc2Vzc2lvbl9pZCIlNjc0ZjhkZTBlYzA5ZDQ3YzZjZmRmMDE5Njc1YjZlYjc6EGFmdGVyX2xvZ2luIgtlZGl0b3I6EXZpZXdlZF9kZWZpZGkDEJgk--bf0a77b787e82e47ec23b69ab1db57354548c851; __gads=ID=b6b9756408606219:T=1281853881:S=ALNI_MbXSkILmQHU9SSQhBxK_JpZyuzM3w; __qca=P0-1545642322-1281853886282; __utma=246446400.175988252.1281853883.1281853883.1281853883.1; __utmb=246446400.4.10.1281853883; __utmc=246446400; __utmz=246446400.1281853990.1.2.utmcsr=yahoo|utmccn=(organic)|utmcmd=organic|utmctr=%22kosher%20meet%20market%22\",\"HTTP_X_FORWARDED_FOR\":\"75.50.180.189, 208.122.62.136\"}"};
    transport = {responseJSON: ticket};
    new Controller().success(transport, element);
    
    expect(element.innerHTML).toEqual("kosher meet market requesting");
  });
});
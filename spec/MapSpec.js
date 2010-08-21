describe("Maps", function() {
  var ticket;
  var element;
  
  beforeEach(function() {
    spyOn(window, 'loadScript');
    spyOn(Urban.Ticket, 'load').andCallFake(function(callback) {
      callback(ticket);
    });
    
    window.google = {maps: {
      Map: jasmine.createSpy('google.maps.Map'),
      LatLng: jasmine.createSpy('google.maps.LatLng').andReturn({lat: 10}),
      MapTypeId: {ROADMAP: 10101}
    }};

    $("jasmine_content").update("<div class='widget' id='widget'><div id='map-element'></div></div>");
    element = $("map-element");
  });

  it("loads", function() {
    ticket = new Urban.Ticket({"description":"Hello,Thanks,\nN\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.126 Safari/533.4\",\"REMOTE_ADDR\":\"208.122.31.10\",\"HTTP_REFERER\":null,\"HTTP_COOKIE\":\"__qca=P0-447681624-1282156495013; __gads=ID=cef860e362d010e2:T=1282156496:S=ALNI_MZnlOLsEPsLIMpNPUFSyXIqYN0WTg; __utmz=246446400.1282156669.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=emil%20mesaros; __utma=246446400.35929657.1282156669.1282156669.1282156669.1; __utmc=246446400; __utmb=246446400.1.10.1282156669; _urban_session=BAh7BzoPc2Vzc2lvbl9pZCIlZDAwMGI0OGQ4NDUxMzc2NGQ5OTk4YjYxZDc0MjYyYzY6EXZpZXdlZF9kZWZpZCIMMzE1MDg1Ng%3D%3D--e36a5b9417acd5ab9fef2a7cf434acdc3200e422\",\"HTTP_X_FORWARDED_FOR\":\"86.34.204.8, 208.122.31.29\"}"});
    
    new Urban.Map(element);
    window.mapsLoaded();
    window.geoPlugin({geoplugin_latitude: "myLat", geoplugin_longitude: "myLon"});
    
    expect(window.loadScript.callCount).toEqual(2);
    expect(window.loadScript.argsForCall[0]).toEqual([Urban.Map.MAPS_URL]);
    expect(window.loadScript.argsForCall[1]).toEqual([Urban.Map.GEOPLUGIN_URL + '86.34.204.8']);
    
    expect(google.maps.Map).toHaveBeenCalled();
    
    var args = google.maps.Map.mostRecentCall.args;
    expect(args[0]).toEqual(element);
    expect(args[1].zoom).toEqual(6);
    expect(args[1].center).toEqual({lat: 10});
    expect(args[1].mapTypeId).toEqual(10101);

    expect(google.maps.LatLng.mostRecentCall.args[0]).toEqual("myLat");
    expect(google.maps.LatLng.mostRecentCall.args[1]).toEqual("myLon");
  });
  
  describe("errors", function() {
    it("hides the widget when ticket doesn't have parameters", function() {
      ticket = new Urban.Ticket({"description":"Hello,Thanks,\nN"});

      new Urban.Map(element);
      window.mapsLoaded();
      expect(window.loadScript.callCount).toEqual(1);
      expect(window.loadScript.argsForCall[0]).toEqual([Urban.Map.MAPS_URL]);
      expect($("widget").visible()).toBeFalsy();
    });

    it("hides the widget when ticket has parameters but no IP", function() {
      ticket = new Urban.Ticket({"description":"Hello,Thanks,\nN\n\n------------------\n Submitted from: {\"HTTP_USER_AGENT\":\"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.126 Safari/533.4\",\"REMOTE_ADDR\":\"208.122.31.10\",\"HTTP_REFERER\":null,\"HTTP_COOKIE\":\"__qca=P0-447681624-1282156495013; __gads=ID=cef860e362d010e2:T=1282156496:S=ALNI_MZnlOLsEPsLIMpNPUFSyXIqYN0WTg; __utmz=246446400.1282156669.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=emil%20mesaros; __utma=246446400.35929657.1282156669.1282156669.1282156669.1; __utmc=246446400; __utmb=246446400.1.10.1282156669; _urban_session=BAh7BzoPc2Vzc2lvbl9pZCIlZDAwMGI0OGQ4NDUxMzc2NGQ5OTk4YjYxZDc0MjYyYzY6EXZpZXdlZF9kZWZpZCIMMzE1MDg1Ng%3D%3D--e36a5b9417acd5ab9fef2a7cf434acdc3200e422\"}"});

      new Urban.Map(element);
      window.mapsLoaded();
      expect(window.loadScript.callCount).toEqual(1);
      expect(window.loadScript.argsForCall[0]).toEqual([Urban.Map.MAPS_URL]);
      expect($("widget").visible()).toBeFalsy();
    });
  });
});
var success = function(transport, element) {
  element = element || $("my-widget");
  var description = transport.responseJSON.description;
  description = description.split("------------------")[0];

  var matches = [];
  
  function addMatches(pattern) {
    while (match = pattern.exec(description)) {
      matches.push(match[1]);
    }
  }

  addMatches(/defid=(\d+)/g);
  addMatches(/"([^"]{0,30})"/g);
  addMatches(/'([^']{0,30})'/g);
  
  element.update(matches.join(" "));
};

if (window.location.href.match(/ticket/)) {
  new Ajax.Request(window.location.href + ".json", {
    method: "GET",
    onSuccess: success
  });
}
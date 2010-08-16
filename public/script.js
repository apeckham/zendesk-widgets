var success = function(transport, element) {
  element = element || $("my-widget");
  var description = transport.responseJSON.description;
  description = description.split("------------------")[0];

  var matches = [];

  var pattern = /defid=(\d+)/g;
  while (match = pattern.exec(description)) {
    matches.push(match[1]);
  }

  var pattern = /"([^"]+)"/g;
  while (match = pattern.exec(description)) {
    matches.push(match[1]);
  }

  var pattern = /'([^']{0,30})'/g;
  while (match = pattern.exec(description)) {
    matches.push(match[1]);
  }
  
  element.update(matches.join(" "));
};

if (window.location.href.match(/ticket/)) {
  new Ajax.Request(window.location.href + ".json", {
    method: "GET",
    onSuccess: success
  });
}
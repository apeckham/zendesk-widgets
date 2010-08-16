var success = function(transport, element) {
  element = element || $("my-widget");
  var description = transport.responseJSON.description;
  var match = description.match(/defid=(\d+)/);
  
  if (match) {
    element.update(match[1]);
  } else {
    element.update("no defids");
  }
};

// if (window.location.href.match(/ticket/)) {
  new Ajax.Request(window.location.href + ".json", {
    method: "GET",
    onSuccess: success
  });
// }

var success = function(transport, element) {
  element = element || $("my-widget");
  element.update("Subject: " + transport.responseJSON.subject);
};

if (window.location.href.match(/ticket/)) {
  new Ajax.Request(window.location.href + ".json", {
    method: "GET",
    onSuccess: success
  });
}

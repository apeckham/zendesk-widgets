var success = function(transport) {
  $("my-widget").update("Subject: " + transport.responseJSON.subject);
};

new Ajax.Request(window.location.href + ".json", {
  method: "GET",
  onSuccess: success
});
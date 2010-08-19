if (window.location.href.match(/ticket/)) {
  new UrbanWidget.Request().send(window.location.href);
}
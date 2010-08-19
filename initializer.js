window.WIDGET_HOST = window.location.href.toQueryParams().dev ? 'localhost:9292' : 'zendesk-widgets.heroku.com';

var element = document.createElement("script");
element.src = "http://" + window.WIDGET_HOST + "/lib.js";
document.body.appendChild(element);
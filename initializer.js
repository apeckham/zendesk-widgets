var widget_host = window.location.href.toQueryParams().dev ? 'localhost:9292' : 'zendesk-widgets.heroku.com';

var element = document.createElement("script");
element.src = "http://" + widget_host + "/all.js";
document.body.appendChild(element);
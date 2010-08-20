Element.addMethods({  
  getInnerText: function(element) {
    element = $(element);
    return element.innerText && !window.opera ? element.innerText
      : element.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, ' ');
  }
});
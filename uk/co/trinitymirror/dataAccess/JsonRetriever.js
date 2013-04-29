"use strict";
/* 
 * Retrieves JSON from a URL asynchronously, parses it into an object and
 * passes the result to a handler (which should implement the method
 * handleJson(jsonObject)
 */
if(typeof uk.co.trinitymirror.dataAccess.JsonRetriever == "undefined") (function() {
  
  /*
   * Constructor
   *
   * @param jQuery: an object with an ajax method like jQuery (probably jQuery)
   */
  uk.co.trinitymirror.dataAccess.JsonRetriever = function(jQuery) {
    this.jQuery = jQuery;
  };
  var Class = uk.co.trinitymirror.dataAccess.JsonRetriever;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /*
   *
   * @param url: the URL to retrieve the JSON data from
   * @param handler: the handler for the data (which needs to implement the 
   *                  handleJson(jsonObject) method)
   *
   * @return the Observable (so that we can chain the addition of property listeners)
   */
  Class.prototype.retrieveJson = function(url, handler) {
    this.jQuery.ajax({
      "url": url,
      "success": handler.handleJson,
      "context": handler
    });
  }
 
})();

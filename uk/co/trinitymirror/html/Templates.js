"use strict";
/* 
 * Objects of this class render templates and store the compiled templates
 * It shares the templates across all instances to avoid unnecessary reloading
 * and compiling of templates
 *
 */
if(typeof uk.co.trinitymirror.observer.Templates == "undefined") (function() {
  
  /*
   * Constructor 
   *
   *   constructs a new Templates object if one doesn't already
   *   exist. Otherwise it generates the singleton.
   * 
   * @param parameters
   *   Handlebars - override handlebars if required
   *   jQuery - override jQuery if required
   *
   */
  uk.co.trinitymirror.html.Templates = function(parameters) {
    var parameters = parameters || {};
    var Class = uk.co.trinitymirror.html.Templates;
    this.Handlebars = parameters.Handlebars || Handlebars;
    this.jQuery = parameters.jQuery || jQuery;
  };
  var Class = uk.co.trinitymirror.html.Templates;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /* 
    Store the templates in a static variable (for caching)
   */
  Class.prototype.templates = {};

  /*
   * This method loads the template from the URL (if necessary)
   * and renders the context into HTML using Handlebars, it then
   * passes the HTML to a handler which must implement the 
   * handleHtml(html) method
   *
   * @param templateUrl - the URL of the Handlebars template
   * @param context - the object to render into the HTML
   * @param htmlHandler - the object which uses the HTML
   *
   */
  Class.prototype.renderHtml = function(templateUrl, context, htmlHandler) {
    // use template if we already have it, otherwise load and compile it before
    // running
    if(templateUrl in this.templates) {
      var html = this.templates[templateUrl](context);
      htmlHandler.handleHtml(html);
    } else if(templateUrl == "IDENTITY") {
      var template = this.Handlebars.compile("{{{.}}}");
      this.templates[templateUrl] = template;
      this.renderHtml(templateUrl, context, htmlHandler);
    } else {
      this.jQuery.ajax({
        "url": templateUrl,
	"dataType": "text",
	"success": function(data) {
	  var template = this.Handlebars.compile(data);
	  this.templates[templateUrl] = template;
	  this.renderHtml(templateUrl, context, htmlHandler);
	},
	"context": this
      });
    }
  }
  
})();

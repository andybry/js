"use strict";
/* 
 * Responds to a change in the model by loading a piece of HTML into
 * all HTML elements matching a given CSS selector
 */
if(typeof uk.co.trinitymirror.dom.HtmlLoader == "undefined") (function() {
  
  /*
   * Constructor 
   *
   * 
   * 
   * @param parameters
   *   model - the model to listen for changes in
   *   jQuery - override jQuery if necessary
   *   TemplatesClass - the class that renders HTML templates
   *
   */
  uk.co.trinitymirror.dom.HtmlLoader = function(parameters) {
    this.model = parameters.model;
    this.jQuery = parameters.jQuery || jQuery;
    var TemplatesClass = parameters.TemplatesClass || uk.co.trinitymirror.html.Templates;
    this.templates = new TemplatesClass();
  };
  var Class = uk.co.trinitymirror.dom.HtmlLoader;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /*
   * Respond to a change in the model by rendering a template
   * based on a model field and updating the DOM with this 
   * HTML
   * 
   * @param parameters
   *  selector - the CSS selector to use
   *  fieldName - the model field to listen for changes in
   *  templateUrl - the template to render into HTML
   *  method - whether to prepend, append, or replace
   *  ui - object for attaching the UI
   */
  Class.prototype.register = function(parameters) {
    var htmlLoader = this;
    this.model.addPropertyListener(parameters.fieldName, {
      "respondToChange": function(model, value) {
        htmlLoader.templates.renderHtml(parameters.templateUrl, value, {
	  "handleHtml": function(html) {
	    var elements = htmlLoader.jQuery(parameters.selector);
	    switch(parameters.method) {
	      case "append":
	        elements.append(html);
	        break;
              case "prepend":
	        elements.prepend(html);
		break;
	      default:
	        elements.html(html);
	    }
	    if(parameters.ui) {
	      parameters.ui.attachUi();
	    }
	  }
	});
      }
    });
  }
  
})();

"use strict";
/*
 * adds or removes a class based on true false values in the model
 */
if(typeof uk.co.trinitymirror.dom.ClassToggler == "undefined") (function() {
  
  /*
   * Constructor 
   * 
   * @param parameters
   *   model - the model to listen for changes in
   *   jQuery - override jQuery if necessary
   *
   */
  uk.co.trinitymirror.dom.ClassToggler = function(parameters) {
    this.model = parameters.model;
    this.jQuery = parameters.jQuery || jQuery;
  };
  var Class = uk.co.trinitymirror.dom.ClassToggler;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /*
   * Respond to a change in the model by toggling a class on an
   * element based on a model field and updating the DOM with this 
   * 
   * @param parameters
   *  selector - the CSS selector to use
   *  fieldName - the model field to listen for changes in
   *  className - the class to add
   */
  Class.prototype.register = function(parameters) {
    var classToggler = this;
    this.model.addPropertyListener(parameters.fieldName, {
      "respondToChange": function(model, value) {
        var elements = classToggler.jQuery(parameters.selector);
	if(value) {
	  elements.addClass(parameters.className);
	} else {
	  elements.removeClass(parameters.className);
	}
      }
    });
  }
 

})();

"use strict";
/*
 * Render the gallery onto the page and attach the view to 
 * the model
 */
if(typeof uk.co.trinitymirror.imageGallery.TeaserView == "undefined") (function() {
  
  /*
   * Constructor
   *
   * @param parameters:
   *   model - abstract representation of the gallery
   *   teaserTemplateUrl - the URL of the Handlebars template for the teaser
   *   lightboxTemplateUrl - the URL of the Handlebars template for the teaser
   *   teaserSelector - the selector for the part of the page where the gallery is placed
   *                    Gallery is prepended to this point
   *                        but can be overridden by setting this value
   *                      data. (defaults to JsonToModel)
   *   HtmlLoaderClass - class which inserts Html into the DOM based on model changes
   *   ClassTogglerClass - class which toggles class based on model changes
   *   jQuery - override jQuery if necessary
   */
  uk.co.trinitymirror.imageGallery.TeaserView = function(parameters) {
    this.model = parameters.model;
    this.teaserTemplateUrl = parameters.teaserTemplateUrl;
    this.teaserSelector = parameters.teaserSelector;
    this.HtmlLoaderClass = parameters.HtmlLoaderClass || uk.co.trinitymirror.dom.HtmlLoader;
    this.ClassTogglerClass = parameters.ClassTogglerClass || uk.co.trinitymirror.dom.ClassToggler;
    this.jQuery = parameters.jQuery || jQuery;
  };
  var Class = uk.co.trinitymirror.imageGallery.TeaserView;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;


  /*
   * Render the view and attach the model
   */
  Class.prototype.createView = function() {
    var htmlLoader = new this.HtmlLoaderClass({"model": this.model});
    var classToggler = new this.ClassTogglerClass({"model": this.model});
    var view = this;

    /* RENDER THE TEMPLATE */
    htmlLoader.register({
      "selector": this.teaserSelector,
      "fieldName": "teaser",
      "method": "prepend",
      "templateUrl": this.teaserTemplateUrl,
      "ui": {
        "attachUi": function() {
          /* Register Teaser UI */
          view.jQuery("#gallery-" + view.model.imageGallery.id).click(function() {
	    view.model.setProperty("showGallery", true);
	  });
	}
      }
    });

    /* ATTACH MODEL TO VIEW */
    // no model (once rendered the teaser doesn't change)
  }

})();

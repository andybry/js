"use strict";
/*
 * Render the gallery onto the page and attach the view to 
 * the model
 */
if(typeof uk.co.trinitymirror.imageGallery.LightboxView == "undefined") (function() {
  
  /*
   * Constructor
   *
   * @param parameters:
   *   model - abstract representation of the gallery
   *   lightboxTemplateUrl - the URL of the Handlebars template for the teaser
   *   HtmlLoaderClass - class which inserts Html into the DOM based on model changes
   *   ClassTogglerClass - class which toggles class based on model changes
   *   jQuery - override jQuery if necessary
   */
  uk.co.trinitymirror.imageGallery.LightboxView = function(parameters) {
    this.model = parameters.model;
    this.lightboxTemplateUrl = parameters.lightboxTemplateUrl;
    this.HtmlLoaderClass = parameters.HtmlLoaderClass || uk.co.trinitymirror.dom.HtmlLoader;
    this.ClassTogglerClass = parameters.ClassTogglerClass || uk.co.trinitymirror.dom.ClassToggler;
    this.jQuery = parameters.jQuery || jQuery;
  };
  var Class = uk.co.trinitymirror.imageGallery.LightboxView;

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
     
    // output the lightbox
    htmlLoader.register({
      "selector": "body",
      "fieldName": "lightbox",
      "method": "append",
      "templateUrl": this.lightboxTemplateUrl,
      "ui": {
        "attachUi": function() {
	  // Registering Lightbox UI goes here
	}
      }
    });

    /* ATTACH MODEL TO VIEW */
    // model.showGallery is linked to the 'has-lightbox' class
    // this shows the gallery if it is present on the lightbox
    this.model.addPropertyListener("imageGallery", {
      "respondToChange": function(model, value) {
        classToggler.register({
          "selector": "#lightbox-" + model.imageGallery.id,
          "fieldName": "showGallery",
          "className": "has-lightbox"
        });
      }
    });

  }

})();

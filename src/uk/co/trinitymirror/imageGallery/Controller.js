"use strict";
/* 
 * This class controls Image Gallery and handles dependency injection for the 
 * other classes used
 */
if(typeof uk.co.trinitymirror.imageGallery.Controller == "undefined") (function() {
  
  /*
   * Constructor
   *
   * @param parameters:
   *   galleryUrl - the JSON API URL of the gallery [required]
   *   teaserTemplateUrl - the URL of the Handlebars template for the teaser
   *   lightboxTemplateUrl - the URL of the Handlebars template for the teaser
   *   teaserSelector - the selector for the part of the page where the gallery is placed
   *                    Gallery is prepended to this point
   *   JsonRetrieverClass - defaults to JsonRetriever, 
   *                        but can be overridden by setting this value
   *   ModelClass - the class used to store the data (defaults to Observable)
   *   JsonToModelClass - the class used to populate the model using the JSON
   *                      data. (defaults to JsonToModel)
   *   TeaserViewClass - the class used to render the teaser onto the page and attach
   *               the model
   *   LightboxViewClass - the class used to render the lightbox onto the page and attach
   *               the model
   */
  uk.co.trinitymirror.imageGallery.Controller = function(parameters) {
    this.galleryUrl = parameters.galleryUrl;
    this.teaserTemplateUrl = parameters.teaserTemplateUrl;
    this.lightboxTemplateUrl = parameters.lightboxTemplateUrl;
    this.teaserSelector = parameters.teaserSelector;
    this.JsonRetrieverClass = parameters.TransportClass || uk.co.trinitymirror.dataAccess.JsonRetriever;
    this.ModelClass = parameters.ModelClass || uk.co.trinitymirror.observer.Observable;
    this.JsonToModelClass = parameters.JsonToModelClass || uk.co.trinitymirror.imageGallery.JsonToModel;
    this.TeaserViewClass = parameters.TeaserViewClass || uk.co.trinitymirror.imageGallery.TeaserView;
    this.LightboxViewClass = parameters.LightboxViewClass || uk.co.trinitymirror.imageGallery.LightboxView;
  };
  var Class = uk.co.trinitymirror.imageGallery.Controller;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /* 
   * This method renders the image gallery and sets up the handlers for 
   * user interaction
   */
  Class.prototype.run = function() {
    var jsonRetriever = new this.JsonRetrieverClass();
    var model = new this.ModelClass();
    // create the views
    var teaserView = new this.TeaserViewClass({
      "model": model,
      "teaserTemplateUrl": this.teaserTemplateUrl,
      "teaserSelector": this.teaserSelector
    });
    teaserView.createView();
    var lightboxView = new this.LightboxViewClass({
      "model": model,
      "lightboxTemplateUrl": this.lightboxTemplateUrl
    });
    lightboxView.createView(); 
    // populate the model
    var jsonToModel = new this.JsonToModelClass(model);
    jsonRetriever.retrieveJson(this.galleryUrl, jsonToModel);
  }
  
})();

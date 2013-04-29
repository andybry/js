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
   *   jQuery - jQuery 
   *   Handlebars - Handlebars
   *   JsonRetrieverClass - defaults to JsonRetriever, 
   *                        but can be overridden by setting this value
   *   ModelClass - the class used to store the data (defaults to Observable)
   *   JsonToModelClass - the class used to populate the model using the JSON
   *                      data. (defaults to JsonToModel)
   */
  uk.co.trinitymirror.imageGallery.Controller = function(parameters) {
    this.galleryUrl = parameters.galleryUrl;
    this.jQuery = parameters.jQuery || jQuery;
    this.Handlebars = parameters.Handlebars || Handlebars;
    this.JsonRetrieverClass = parameters.TransportClass || uk.co.trinitymirror.dataAccess.JsonRetriever;
    this.ModelClass = parameters.ModelClass || uk.co.trinitymirror.observer.Observable;
    this.JsonToModelClass = parameters.JsonToModelClass || uk.co.trinitymirror.imageGallery.JsonToModel;
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
    var jsonRetriever = new this.JsonRetrieverClass(this.jQuery);
    var model = new this.ModelClass();
    model.addPropertyListener("imageGallery", {
      "respondToChange": function(model, value) {
        print(value.title);
      }
    });
    model.addPropertyListener("currentImageIndex", {
      "respondToChange": function(model, value) {
        print(value);
      }
    });
    var jsonToModel = new this.JsonToModelClass(model);
    jsonRetriever.retrieveJson(this.galleryUrl, jsonToModel);
    // an image gallery API URL: http://api.mirror.co.uk/incoming/article1169163.ece/1756099
    // the article that it's embedded in: http://www.mirror.co.uk/3am/us-gossip/kristen-stewart-pictured-rupert-sanders-1848973
    // the HTML for the image gallery (ajax): http://www.mirror.co.uk/incoming/article1169163.ece?service=ajax&share_art_id=1848973
    // 10 images on the launch page of the gallery
  }
  
})();

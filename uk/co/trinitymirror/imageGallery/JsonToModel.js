"use strict";
/* 
 * This class implements the handleJson method, which is the callback
 * for JsonRetriever. This method populates the model with fields retrieved
 * from the JSON data.
 */
if(typeof uk.co.trinitymirror.imageGallery.JsonToModel == "undefined") (function() {
  
  /*
   * Constructor
   *
   * @param model: the model to populate (needs to be an Observable)
   */
  uk.co.trinitymirror.imageGallery.JsonToModel = function(model) {
    this.model = model;
  };
  var Class = uk.co.trinitymirror.imageGallery.JsonToModel;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /*
   * Retrieves values from the JSON data to populate the model
   * 
   * @param json: a json object representing the image gallery
   * 
   */
  Class.prototype.handleJson = function(jsonObject) {
    var imageGallery = {
      "title": jsonObject.article.fields.title,
      "images": []
    };
    var pictureRelations = jsonObject.article.relatedElements.picturerel;
    for(var imageIndex in pictureRelations) {
      var currentImage = pictureRelations[imageIndex];
      imageGallery.images[imageIndex] = {
        "title": currentImage.summaryFields.title.mValue,
        "alttext": currentImage.summaryFields.alttext.mValue,
        "leadtext": currentImage.summaryFields.leadtext.mValue,
        "caption": currentImage.summaryFields.caption.mValue,
        "url": currentImage.url
      }
    }
    this.model.setProperty("imageGallery", imageGallery);
    this.model.setProperty("currentImageIndex", 0);
  }

})();

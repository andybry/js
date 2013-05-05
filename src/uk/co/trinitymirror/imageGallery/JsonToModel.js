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
    // calculate the core model (imageGallery)
    var imageGallery = {
      "id": jsonObject.article.id,
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

    // use the core model to populate the model for the teaser template 
    var numberOfTeaserImages = Math.min(10, imageGallery.images.length);
    var teaser = {
      "mainImage": imageGallery.images[0],
      "otherImages": imageGallery.images.slice(0, numberOfTeaserImages),
      "id": imageGallery.id,
      "title": imageGallery.title
    };
    this.model.setProperty("teaser", teaser);

    // use the core model to populate the model for the lightbox template
    var lightbox = {
      "id": imageGallery.id,
      "mainImage": imageGallery.images[0],
      "title": imageGallery.title,
      "numberOfPages": Math.ceil(imageGallery.images.length / 3),
      "caption": imageGallery.images[0].caption,
      "images": imageGallery.images.slice(0, 3)
    };
    lightbox.images[0].isActive = true;
    this.model.setProperty("lightbox", lightbox);

    // populate DOM manipulation fields (these will trigger changes to the DOM)
    this.model.setProperty("currentImageIndex", 0); // which image is displayed
    this.model.setProperty("showGallery", false); // whether the gallery is visible
  }

})();

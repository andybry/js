"use strict";
/* 
  Avoid 64K limit for methods in Rhino optimisation.
  This can also be set using the command line option:
   -opt -1
 */
Packages.org.mozilla.javascript.Context.
        getCurrentContext().setOptimizationLevel(-1);

/* 
  env.js DOM implementation in JavaScript 
  Website: http://www.envjs.com/
 */
load("lib/env.rhino.1.2.js");

/* libraries */
load("lib/jquery-1.9.1.js");
jQuery.support.cors = true; // tells jQuery to allow CORS
load("lib/handlebars-1.0.0-rc.3.js");

/* set up Trinity Mirror Packages */
load("uk/package.js");
load("uk/co/package.js");
load("uk/co/trinitymirror/package.js");

/* Observable */
load("uk/co/trinitymirror/observer/package.js");
load("uk/co/trinitymirror/observer/Observable.js");

/* json access */
load("uk/co/trinitymirror/dataAccess/package.js");
load("uk/co/trinitymirror/dataAccess/JsonRetriever.js");

/* html rendering */
load("uk/co/trinitymirror/html/package.js");
load("uk/co/trinitymirror/html/Templates.js");

/* DOM manipulation */
load("uk/co/trinitymirror/dom/package.js");
load("uk/co/trinitymirror/dom/HtmlLoader.js");
load("uk/co/trinitymirror/dom/ClassToggler.js");

/* controller */
load("uk/co/trinitymirror/imageGallery/package.js");
load("uk/co/trinitymirror/imageGallery/Controller.js");

/* model */
load("uk/co/trinitymirror/imageGallery/JsonToModel.js");

/* view */
load("uk/co/trinitymirror/imageGallery/TeaserView.js");
load("uk/co/trinitymirror/imageGallery/LightboxView.js");


/* the code that uses the above (how to set up the gallery) */
new uk.co.trinitymirror.imageGallery.Controller({
  "galleryUrl": "http://api.mirror.co.uk/incoming/article1169163.ece/1756099",
  "teaserTemplateUrl": "templates/imageGallery/teaser.tmpl",
  "lightboxTemplateUrl": "templates/imageGallery/lightbox.tmpl",
  "teaserSelector": "body"
}).run();


/* integration tests */
// wait until the image gallery is loaded fully
var loaded = false;
var teaserSelector = "#gallery-1169163";
var lightboxSelector = "#lightbox-1169163";
var printnoln = function(text) {
  java.lang.System.out.print(text);
}

printnoln("Waiting for gallery to load");
while(!loaded) {
  loaded = ($(teaserSelector).length > 0) && ($(lightboxSelector).length > 0);
  java.lang.Thread.sleep(100);
  printnoln(".");
}
print("OK");
print("");
print("Test: that the gallery initially lacks the class that");
print("displays the gallery");
print("#####################################################");
if(!$(lightboxSelector).hasClass('has-lightbox')) print("OK")
else print("FAILED");
print("");
print("Test: that clicking the teaser adds the class to");
print("display the gallery");
print("#####################################################");
print("Clicking teaser");
$(teaserSelector).click();
print("Checking the gallery has the correct class");
if($(lightboxSelector).hasClass('has-lightbox')) print("OK")
else print("FAILED");

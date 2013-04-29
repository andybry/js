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

/* imageGallery */
load("uk/co/trinitymirror/imageGallery/package.js");
load("uk/co/trinitymirror/imageGallery/Controller.js");

/* model populator */
load("uk/co/trinitymirror/imageGallery/JsonToModel.js");


/* the code that uses the above */
new uk.co.trinitymirror.imageGallery.Controller({
  "galleryUrl": "http://api.mirror.co.uk/incoming/article1169163.ece/1756099"
}).run();

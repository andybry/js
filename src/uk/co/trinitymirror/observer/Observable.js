"use strict";
/* 
 * Classes which extend this class implement the observable pattern.
 * This means that they can register listener classes to respond to 
 * a property value changing.
 *
 * Property Listeners should implement the method respondToChange(observable, value)
 */
if(typeof uk.co.trinitymirror.observer.Observable == "undefined") (function() {
  
  /*
   * Constructor
   */
  uk.co.trinitymirror.observer.Observable = function() {
    // map of property names to array of Listeners
    this.propertyListeners = {};
  };
  var Class = uk.co.trinitymirror.observer.Observable;

  /*
   * Extends Object
   */
  Class.prototype = new Object();
  Class.prototype.constructor = Class;

  /*
   * This method allows us to add a property listener for a given
   * property
   *
   * @param property: the name of the property
   * @param listener: the property listener (which needs to implement the 
   *                  respondToChange(observable, value) method)
   *
   * @return the Observable (so that we can chain the addition of property listeners)
   */
  Class.prototype.addPropertyListener = function(property, listener) {
    this.propertyListeners[property] = this.propertyListeners[property] || [];
    this.propertyListeners[property].push(listener);
    return this;
  }

  /*
   * This method allows us to modify a property and calls any listeners that
   * are registered agains that property
   *
   * @param property: the name of the property
   * @param value: the value of the property
   *
   * @return the Observable (so that we can chain the setting of properties)
   */
  Class.prototype.setProperty = function(property, value) {
    this[property] = value;
    for(var index in this.propertyListeners[property]) {
      this.propertyListeners[property][index].respondToChange(this, value);
    }
    return this;
  }
  
})();

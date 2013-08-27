/* Author: Hugues Demers
 * Copyrights 2013
  
*/
define([
  "jquery",
  "underscore",
  "map",
],
function ($, _, map) {
  var exports = {}, mapElement = 'map',
    resizeMap;

  exports.initialize = function () {
    console.log("Initializing 'whereami' app.");

    // Set the height of the div `#map`.
    resizeMap();
    // Build our map.
    map.initialize(mapElement);
  };

  /**
   * When the window resizes, make sure our div `#map` is also updated.
   */
  $(window).resize(function () {
    resizeMap();
  });


  resizeMap = function () {
    $("#" + mapElement).height($(window).height());
  };

  return exports;
});


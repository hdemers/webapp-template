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

    // Build our map.
    map.initialize(mapElement);
  };

  return exports;
});


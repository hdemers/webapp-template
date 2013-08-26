/* Author: Hugues Demers
 * Copyrights 2013
 */

/*global L:false, appConfig:false*/
define([
  "jquery",
  "underscore",
  "leaflet",
  "usermarker"
],
function ($, _, leaflet) {
  var exports = {}, map, mapElement, marker;

  exports.initialize = function (element) {
    console.log("Initializing map.");
    var cloudmade;

    mapElement = element;
    map = L.map(mapElement);

    cloudmade = L.tileLayer(
      'http://{s}.tile.cloudmade.com/' + appConfig.cloudmadeApiKey +
      '/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);

    map.setView([35, -50], 3);

    map.on("locationfound", function (location) {
      if (!marker) {
        marker = L.userMarker(location.latlng, {
          pulsing: false,  // Very cool to have, but takes all the CPU.
          smallIcon: true
        }).addTo(map);
      }

      marker.setLatLng(location.latlng);
      marker.setAccuracy(location.accuracy);
    });

    map.locate({
      watch: false,
      locate: true,
      setView: true,
      enableHighAccuracy: true
    });
  };

  return exports;
});

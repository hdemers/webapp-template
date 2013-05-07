/* Author: Hugues Demers
 * Copyrights 2013
  
*/
define([
  "jquery",
  "underscore",
  "knockout",
  "viewmodel",
  "twitter",
  "worldmap"
],
function ($, _, ko, viewmodel, twitter, worldmap) {
  var exports = {}, dot, points = [], world;

  exports.initialize = function () {
    console.log("Initializing app.");
    ko.applyBindings(viewmodel);

    $("#worldmap").height($(window).height());
    world = worldmap.create("#worldmap");
    twitter.init();
    twitter.bind("tweet", dot);
  };

  /**
   * Add a dot on the worldmap when a tweet is received.
   */
  dot = function (tweet) {
    var point = {
      lng: tweet.coordinates.coordinates[0],
      lat: tweet.coordinates.coordinates[1],
      r: 1
    };
    points.push(point);
    world.dot(points);
  };

  $(window).resize(function () {
    $("#worldmap").height($(window).height());
    world.redraw();
  });

  return exports;
});

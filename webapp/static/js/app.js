/* Author: Hugues Demers
 * Copyrights 2013
  
*/
define([
  "jquery",
  "underscore",
  "knockout",
  "viewmodel",
  "twitter",
  "worldmap",
  "moment"
],
function ($, _, ko, viewmodel, twitter, worldmap, moment) {
  var exports = {}, dot, points = [], world, deburst,
    previous_receipt_at = 0, tweet_cache = [], intervalId = null;

  exports.initialize = function () {
    console.log("Initializing app.");
    ko.applyBindings(viewmodel);

    $("#worldmap").height($(window).height());
    world = worldmap.create("#worldmap");
    twitter.init();
    twitter.bind("tweets", deburst);
  };

  /**
   * Send tweets to be printed on the map at some interval
   */
  deburst = function (tweets) {
    var interval = 30;
    
    // Empty cache if too big.
    if (tweet_cache.length > 2 * tweets.length) {
      tweet_cache = [];
    }
    tweet_cache = tweet_cache.concat(tweets);

    // Estimate how much time we have to paint each dot on the map. This
    // estimate is based on the last interval and is thus imprecise. That's
    // why we have to empty the cache periodically.
    if (previous_receipt_at) {
      interval = (moment() - previous_receipt_at) / (tweet_cache.length * 1.2);
    }
    previous_receipt_at = moment();
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(function () {
      if (tweet_cache.length) {
        dot(tweet_cache.shift());
      }
    }, interval);
  };


  /**
   * Add a dot on the worldmap.
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

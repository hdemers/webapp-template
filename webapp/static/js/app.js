/* Author: Hugues Demers
 * Copyrights 2012
*/
/*global appConfig:false */
define([
  "jquery",
  "underscore",
  "knockout",
  "viewmodel",
  "graph",
  "bootstrap"
],
function ($, _, ko, viewmodel, graph) {
  var exports = {};

  exports.initialize = function () {
    console.log("Initializing app.");
    graph.initialize("graphContainer1");
    ko.applyBindings(viewmodel);
  };
  return exports;
});
